import puppeteer, { Browser } from "puppeteer";

export async function ScrapperServiceAli(product: string) {
  const browser: Browser = await puppeteer.launch({
    headless: "new", // O valor "new" foi substituído por "true" para tornar o navegador visível
  });
  const page = await browser.newPage();
  if (product.length <= 0) {
    console.log("Nenhum produto encontrado");
    console.timeStamp();
    return browser.close();
  }
  await page.goto(`https://pt.aliexpress.com/wholesale?SearchText=${product}`);

  // Aguarde o seletor que contém os resultados da pesquisa
  await page.waitForSelector(".list-item");

  // Extrai os resultados da pesquisa
  const results = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll(".list-item")
    );
    return items.map((item) => {
      const title = item.querySelector(".item-title")?.textContent?.trim() || "";
      const price = item.querySelector(".price .value")?.textContent?.trim() || "";
      const rating =
        item
          .querySelector(".feedback-rating strong")
          ?.textContent?.trim() || "";
      const reviewCount =
        item
          .querySelector(".feedback-rating .feedback-reviews")
          ?.textContent?.trim() || "";
      const link = item.querySelector(".product")?.getAttribute("href") || "";

      let productLink = "";
      if (link != "") {
        productLink = "https:" + link;
      }

      return { title, price, rating, reviewCount, link: productLink };
    });
  });

  return results;
}

// Exemplo de uso:
// ScrapperServiceAli("fone").then((results) => {
//   console.log(results);
// });
