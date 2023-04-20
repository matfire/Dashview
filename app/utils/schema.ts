import { z } from "zod";

const categorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, {
      message: "please provide a valid hex color code",
    })
    .optional(),
  id: z.string().optional(),
});

const appSchema = z.object({
  category: z.string().optional(),
  name: z.string(),
  url: z.string().url(),
  icon: z.string().optional(),
});

const configSchema = z
  .object({
    categories: z
      .array(categorySchema)
      .refine((v) => v && new Set(v).size === v.length)
      .optional(),
    apps: z.array(appSchema),
  })
  .refine(
    ({ apps, categories }) => {
      if (!categories) {
        return !apps.some((e) => e.category);
      } else {
        return apps.some((e) => {
          return (
            categories.find(
              (c) => c.name === e.category || c.id === e.category
            ) !== undefined
          );
        });
      }
    },
    { message: "if you use categories, each app should belong to a category" }
  );

export default configSchema;
export type Config = z.infer<typeof configSchema>;
export type App = z.infer<typeof appSchema>;
export type Category = z.infer<typeof categorySchema>;
