import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const userPrefs = createCookie("user-prefs", {});