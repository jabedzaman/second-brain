"use server";

export interface SearchResult {
  id: string;
  score: number;
  metadata: {
    title: string;
    url: string;
    description: string;
    favicon?: string;
  };
}

import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { ai } from "~/lib/genai";
import { pc } from "~/lib/pinecone";

export const sementicSearch = async (query: string) => {
  // get session
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  // generate embedding for the bookmark using GenAI
  // dimension: 1536, metric: cosine
  const embeddingContentResponse = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [query],
  });
  const embedding = embeddingContentResponse.embeddings?.length
    ? embeddingContentResponse.embeddings[0].values // Added .values property
    : [];

  // search the embedding in Pinecone
  const index = pc.Index(
    "bookmarks",
    "https://bookmarks-bfnfic0.svc.aped-4627-b74a.pinecone.io"
  );
  const result = await index.query({
    vector: embedding || [],
    topK: 20, // number of results to return
    includeMetadata: true,
    filter: { userId: session.user.id },
  });

  const matches = result.matches || [];

  const searchResults: SearchResult[] = matches.map((match) => ({
    id: match.id || "",
    score: match.score || 0,
    metadata: {
      title: (match.metadata?.title as string) || "",
      url: (match.metadata?.url as string) || "",
      description: (match.metadata?.description as string) || "",
    },
  }));

  return searchResults;
};
