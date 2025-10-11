import z from "zod";

export const searchSchema = z.object({
  query: z.string().min(1, {
    message: "Search query cannot be empty.",
  }),
});

export type SearchFormData = z.infer<typeof searchSchema>;
