import { NextRequest } from "next/server";
import openGraphScrapper from "open-graph-scraper";
import { pc } from "~/lib/pinecone";
import { ai } from "~/lib/genai";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  // fetch metadata from the URL, e.g., title, description, etc.
  // save the bookmark to the database
  const { result } = await openGraphScrapper({ url });

  // generate embedding for the bookmark using GenAI
  // dimension: 1536, metric: cosine
  const embedding = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [JSON.stringify(result)],
  });

  // save the embedding to Pinecone
  const index = pc.Index(
    "bookmarks",
    "https://bookmarks-bfnfic0.svc.aped-4627-b74a.pinecone.io"
  );
  await index.upsert([
    {
      id: result.ogUrl || url,
      values: embedding.embeddings?.length
        ? embedding.embeddings[0].values
        : [],
      metadata: {},
    },
  ]);

  return new Response(JSON.stringify(result), { status: 200 });
}
