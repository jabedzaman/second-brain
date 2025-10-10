import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./mongo";
import { env } from "~/config";

/**
 * Authentication handler using better-auth with MongoDB adapter.
 */
export const auth = betterAuth({
  database: mongodbAdapter(db),
  trustedOrigins: ["chrome-extension://gmkcobcopphplkclpbcobkbogjghbhio"],
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
