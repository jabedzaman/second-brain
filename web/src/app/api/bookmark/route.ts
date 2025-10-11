import { NextRequest } from "next/server";
import urlMetadata from "url-metadata";
import { pc } from "~/lib/pinecone";
import { ai } from "~/lib/genai";
import { prisma } from "~/lib/prisma";
import { bookMarkValidation } from "./validation";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // validate the URL
  const { success, data, error } = await bookMarkValidation.safeParseAsync(
    body
  );

  if (!success) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }

  const { url } = data; // better dx

  // check if the bookmark already exists
  const exists = await prisma.site.findFirst({
    where: { url },
  });

  // return the existing bookmark if it exists
  if (exists) {
    return new Response(JSON.stringify(exists), { status: 200 });
  }

  // fetch metadata from the URL, e.g., title, description, etc.
  // save the bookmark to the database
  const result = await urlMetadata(url);

  // generate embedding for the bookmark using GenAI
  // dimension: 1536, metric: cosine
  const embedding = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [`${result.title}\n${result.description}\n${result.url}`],
  });

  // save the embedding to Pinecone
  const index = pc.Index(
    "bookmarks",
    "https://bookmarks-bfnfic0.svc.aped-4627-b74a.pinecone.io"
  );
  await index.upsert([
    {
      id: result.url,
      values: embedding.embeddings?.length
        ? embedding.embeddings[0].values
        : [],
      metadata: {
        title: result.title || "",
        description: result.description || "",
        url: result.ogUrl || url,
      },
    },
  ]);

  if (!exists) {
    await prisma.site.create({
      data: {
        title: result.title,
        description: result.description,
        url: url,
        charset: result.charset,
        locale: result.ogLocale,
        favicon: result.favicon,
      },
    });
  }

  return new Response(JSON.stringify(result), { status: 200 });
}
