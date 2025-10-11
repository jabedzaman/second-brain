import { z } from "zod";

export const bookMarkValidation = z.object({
  url: z.url("Invalid URL format"),
});
