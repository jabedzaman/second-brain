import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "~/config";

/**
 * Pinecone client instance for interacting with the Pinecone vector database.
 */
export const pc = new Pinecone({
  apiKey: env.PINECONE_API_KEY,
});

/**
 * Pinecone index instance for the "bookmarks" index.
 */
export const index = pc.Index(
  "bookmarks",
  "https://bookmarks-bfnfic0.svc.aped-4627-b74a.pinecone.io"
);
