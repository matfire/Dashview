import { z } from "zod";
import { loadIcon } from "@iconify/react";

const categorySchema = z.object({
  name: z.string({ required_error: "please provide a name for each category" }),
  icon: z
    .string()
    .optional()
    .refine(async (iconName) => {
      if (!iconName) return true;
      try {
        await loadIcon(iconName);
        return true;
      } catch {
        return false;
      }
    }, "please provid a valid icon name (following iconify standard)"),
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
  name: z.string({
    required_error: "please provide a name for each application",
  }),
  url: z
    .string({ required_error: "please provide a url for each application" })
    .url({ message: "please provide a valid url for each application" }),
  icon: z
    .string()
    .optional()
    .refine(async (iconName) => {
      if (!iconName) return true;
      try {
        await loadIcon(iconName);
        return true;
      } catch {
        return false;
      }
    }, "please provid a valid icon name (following iconify standard)"),
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
        return apps.every(
          (e) =>
            categories.findIndex(
              (c) => c.name === e.category || c.id === e.category
            ) !== -1
        );
      }
    },
    { message: "if you use categories, each app should belong to a category" }
  );

export default configSchema;
export type Config = z.infer<typeof configSchema>;
export type App = z.infer<typeof appSchema>;
export type Category = z.infer<typeof categorySchema>;
