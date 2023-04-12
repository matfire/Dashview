import test, { expect } from "@playwright/test";

test("default theme should be dark", async ({ page }) => {
  await page.goto("/");
  const body = await page.locator("body");
  const themeColor = await body.getAttribute("data-theme");
  expect(themeColor).toBe("dark");
});

test("changing the theme should change it", async ({ page }) => {
  await page.goto("/settings");
  const select = page.locator("#themeColor");
  const submitButton = page.locator('button[type="submit"]');
  await select.selectOption(["light"]);
  await submitButton.click();
  const body = page.locator("body");
  await expect(body).toHaveAttribute("data-theme", "light");
});
