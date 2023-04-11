import test, { expect } from "@playwright/test";


test("default theme should be dark", async({page}) => {
    await page.goto("/")
    const body = await page.locator("body")
    const themeColor = await body.getAttribute("data-theme");
    expect(themeColor).toBe("dark")
})
test("changing the theme should change it", async({page}) => {
    await page.goto("/settings");
    const body = await page.locator("body")
    const select = await page.locator("#themeColor");
    const submitButton = await page.locator("button[type=\"submit\"]")
    await select.selectOption(["light"])
    await submitButton.click()
    await page.goto("/")
    const themeColor = await body.getAttribute("data-theme");
    expect(themeColor).toBe("light")
})