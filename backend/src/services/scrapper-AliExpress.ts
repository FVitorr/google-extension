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

  console.log("PROCURANDO");

  // Aguarde o seletor que contém os resultados da pesquisa
  await page.waitForSelector(".manhattan--container--1lP57Ag.cards--gallery--2o6yJVt.search-card-item");
  console.log("PAGINA CARREGADA");

  // Extrai os resultados da pesquisa
  const results = await page.evaluate(() => {
    const cardList = document.querySelectorAll(".manhattan--container--1lP57Ag.cards--gallery--2o6yJVt.search-card-item");
    const data: any[] = [];
    console.log(cardList);
    cardList.forEach((item) => {
      const title = item.querySelector(".manhattan--title--24F0J-G.cards--title--2rMisuY > h1")?.textContent?.trim() || "";
      const price = item.querySelector(".manhattan--price--WvaUgDY")?.textContent?.trim() || "";
      const rating = item.querySelector(".manhattan--evaluation--3cSMntr")?.textContent?.trim() || "";
      const reviewCount = item.querySelector(".manhattan--trade--2PeJIEB")?.textContent?.trim() || "";
      const link = item.querySelector(".multi--container--1UZxxHY.cards--card--3PJxwBm.cards--list--2rmDt5R.search-card-item")?.getAttribute("href") || "";
      let productLink = "";
      if (link !== "") {
        productLink = "https:" + link;
      }
      data.push({ title, price, rating, reviewCount, link: productLink });
    });
    return data;
  });

  await browser.close();
  return results;
}

// Exemplo de uso:
// ScrapperServiceAli("fone").then((results) => {
//   console.log(results);
// });