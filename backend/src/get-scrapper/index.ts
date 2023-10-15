import { Request, Response, Router } from "express";
import { ScrapperService } from "../services/scrapper";
import { ProductProps, ProductScrapper } from "../types";
const route = Router();

route.post("/scrapper", async (req: Request, res: Response) => {
  const { productName } = req.body as ProductProps;

  if (productName.length <= 0) {
    return res.send({
      message: "Invalid value",
      erro: "500",
    });
  }

  const callScrapperService = await ScrapperService(productName);

  if (!Array.isArray(callScrapperService)) {
    return res.status(500).send({
      message: "Error calling ScrapperService: Result is not an array",
      erro: "500",
    });
  }

  // Remove elementos com price = "" e retorna somente prices completos
  const filteredResults = callScrapperService.filter(
    (product: ProductScrapper) => product.priceOfString !== ""
  );

  const regex = /R\$\s*((?:\d{1,3}(?:[.,]\d{3})*(?:,\d+)?))/; // Nova regex

  const transformedResults = filteredResults.map((item: ProductScrapper) => {
    const match = item.priceOfString.match(regex);
    if (match) {
      let numericValue = match[1].replace(/[^0-9.,]/g, "");
      // Garanta que haja apenas um ponto decimal e nenhuma vírgula
      numericValue = numericValue.replace(",", ".");
      numericValue = numericValue.replace(/\.(?=\d{3,})/g, ""); // Remova pontos extras

      const numericPrice = parseFloat(numericValue);
      return {
        ...item,
        priceOfString: numericPrice,
      };
    }
    return item;
  });

  // Ordenar do mais caro para o mais barato
  transformedResults.sort(
    (a: any, b: any) => b.priceOfString - a.priceOfString
  );

  return res.send(transformedResults);
});

export default route;
