import { NextRequest } from "next/server";
import { auth } from "~/lib/auth";
import { ai } from "~/lib/genai";
import { index } from "~/lib/pinecone";
import { prisma } from "~/lib/prisma";
import { bookMarkValidation } from "./validation";
import urlMetadata from "url-metadata";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { success, data, error } = await bookMarkValidation.safeParseAsync(
    body
  );
  if (!success) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }

  const { url } = data;

  // Check if user already has this bookmark
  const userHasBookmark = await prisma.bookmark.findFirst({
    where: { userId: session.user.id, site: { url } },
  });

  if (userHasBookmark) {
    return new Response(JSON.stringify(userHasBookmark), { status: 200 });
  }

  // Check if site exists
  let site = await prisma.site.findFirst({ where: { url } });

  // Create site if it doesn't exist
  if (!site) {
    const result = await urlMetadata(url);
    const { title, description, charset, ogLocale: locale, favicon } = result;

    // Generate embedding
    const embeddingContent = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: [`${result.title}\n${result.description}\n${result.url}`],
    });
    const embedding = embeddingContent.embeddings?.length
      ? embeddingContent.embeddings[0].values
      : [];

    // Upsert to Pinecone
    await index.upsert([
      {
        id: url,
        values: embedding,
        metadata: { title, description, url, favicon, userId: session.user.id },
      },
    ]);

    // Create the site
    site = await prisma.site.create({
      data: { title, description, url, charset, locale, favicon },
    });
  }

  // Now create the bookmark (site is guaranteed to exist)
  const bookmark = await prisma.bookmark.create({
    data: {
      userId: session.user.id,
      site: { connect: { id: site.id } }, // Use id instead of url
    },
    include: { site: true },
  });

  return new Response(JSON.stringify(bookmark), { status: 200 });
}
