import puppeteer from "puppeteer";

async function searchAmazon(product, numPages) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  for (let currentPage = 1; currentPage <= numPages; currentPage++) {
    const searchUrl = `https://www.amazon.com.br/s?k=${product}&page=${currentPage}`;
    await page.goto(searchUrl);

    // Aguarda até que os resultados da pesquisa estejam disponíveis
    await page.waitForSelector(".s-main-slot");

    // Extrai os resultados da pesquisa
    const results = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll(".s-main-slot .s-result-item")
      );
      return items.map((item) => {
        const title = item.querySelector("h2 span")?.textContent?.trim() || "";
        const price =
          item.querySelector(".a-price .a-offscreen")?.textContent?.trim() ||
          "";
        const rating =
          item
            .querySelector(".a-icon-star-small .a-icon-alt")
            ?.textContent?.trim() || "";
        const reviewCount =
          item
            .querySelector("span.a-size-base.s-underline-text")
            ?.textContent?.trim() || "";
        const href = item.querySelector("h2 a")?.getAttribute("href") || "";

        let link = ""
        if (href != ""){
            link = "https://www.amazon.com.br" + href;
        }
            
        return { title, price, rating, reviewCount, link };
      });
    });
    console.log(`Page ${currentPage} results:`);
    console.log(results);
  }

  await browser.close();
}


searchAmazon("ps4",2);
