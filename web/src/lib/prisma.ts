import { PrismaClient } from "~/generated/prisma";

/**
 * A singleton instance of the Prisma Client to be used throughout the application.
 */
export const prisma = new PrismaClient();
