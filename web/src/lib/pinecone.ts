import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "~/config";

/**
 * Pinecone client instance for interacting with the Pinecone vector database.
 */
export const pc = new Pinecone({
  apiKey: env.PINECONE_API_KEY,
});
