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
    (product: ProductScrapper) => product.price !== ""
  );

  // Aplicar a regex para extrair apenas os números
  const regex = /R\$\s*([\d,.]+)/; // Regex para encontrar "R$" seguido por dígitos, vírgulas e pontos

  const priceNumber = filteredResults.map((item: ProductScrapper) => {
    const match = item.price.match(regex);
    if (match) {
      return match[1].replace(/[^0-9,.]/g, "");
    }
    return "";
  });

  console.log(priceNumber);

  return res.send(filteredResults);
});

export default route;
