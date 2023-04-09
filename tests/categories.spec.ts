import { test, expect } from "@playwright/test"
import { readFile } from "fs/promises";
import type { Config } from "~/utils/schema";

function rgbToHex(r: number, g: number, b: number) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

test("display enough cards for the number of categories", async ({ page }) => {
    const file: Config = JSON.parse(await (await readFile(process.env.CONFIG!)).toString())
    await page.goto("/");
    const categories = await page.locator("[data-type=\"category\"]").all()
    expect(file.categories!.length).toBe(categories.length)
})

test("if a category has a color, the card should have a border with the same color", async ({ page }) => {
    const file: Config = JSON.parse(await (await readFile(process.env.CONFIG!)).toString())
    await page.goto("/");
    const cats = file.categories?.filter((e) => e.color);
    for (let colorCat of cats) {
        const locator = await page.locator(`#${colorCat.id || colorCat.name}`)
        const style = await locator.evaluate((e) => window.getComputedStyle(e).getPropertyValue("border-color"))
        const extractedColors = /rgb\((\d*), (\d*), (\d*)\)/i.exec(style)
        if (extractedColors === null) {
            throw "could not extract color codes from style";
        }
        expect(rgbToHex(parseInt(extractedColors[1]), parseInt(extractedColors[2]), parseInt(extractedColors[3])).toUpperCase()).toEqual(colorCat.color)
    }
})