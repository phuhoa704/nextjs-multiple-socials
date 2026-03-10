import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  scheduledAt: z.string().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;
