import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

export async function ScrapperService(product: string) {
  const browser: Browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  if (product.length <= 0) {
    console.log("Nenhum produto encontrado");
    console.timeStamp();
    return browser.close();
  }
  await page.goto(`https://www.amazon.com.br/s?k=${product}&page=`);
  await page.waitForSelector(".s-main-slot");

  // Extrai os resultados da pesquisa
  const results = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll(".s-main-slot .s-result-item")
    );
    return items.map((item) => {
      const title = item.querySelector("h2 span")?.textContent?.trim() || "";
      const price_calc =
        item.querySelector(".a-price .a-offscreen")?.textContent?.trim() || "";
      const priceOfString =
        item.querySelector(".a-price .a-offscreen")?.textContent?.trim() || "";
      const rating =
        item
          .querySelector(".a-icon-star-small .a-icon-alt")
          ?.textContent?.trim() || "";
      const reviewCount =
        item
          .querySelector("span.a-size-base.s-underline-text")
          ?.textContent?.trim() || "";
      const href = item.querySelector("h2 a")?.getAttribute("href") || "";

      let link = "";
      if (href != "") {
        link = "https://www.amazon.com.br" + href;
      }

      return { title, priceOfString, price_calc, rating, reviewCount, link };
    });
  });
  return results;
}
