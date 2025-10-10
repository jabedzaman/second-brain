import * as envalid from "envalid";

/**
 * @description environment variables
 */
export const env = envalid.cleanEnv(process.env, {
  // ========= DATABASE =========
  MONGO_URI: envalid.str(),

  // ========= REDIS =========
  REDIS_URI: envalid.str(),

  // ========= AUTH =========
  BETTER_AUTH_SECRET: envalid.str(),

  // ========= GOOGLE =========
  GOOGLE_CLIENT_ID: envalid.str(),
  GOOGLE_CLIENT_SECRET: envalid.str(),
});
