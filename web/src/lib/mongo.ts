import { MongoClient } from "mongodb";
import { env } from "~/config";

/**
 * MongoDB client and database instance.
 */
const client = new MongoClient(env.MONGO_URI);
export const db = client.db();
