import { Request, Response, Router } from "express";
import { ScrapperService } from "../services/scrapper";
const route = Router();

// TODO: REFATORAR O SCRAPPER
// TODO: DIVIDIR AS RESPONSABILIDADES

type ProductProps = {
  productName: string;
};
type ProductScrapper = {
  title: string;
  price: string | number | any | never;
  rating: string;
  reviewCount: string;
  link: string;
};

route.post("/scrapper", async (req: Request, res: Response) => {
  const { productName } = req.body as ProductProps;
  console.log(productName);
  if (productName.length <= 0) {
    return res.status(404).send({
      message: "Invalid value",
      erro: "404",
    });
  }

  const callScrapperService = await ScrapperService(productName);

  if (!callScrapperService) {
    return res.status(500).send({
      message: "Error calling ScrapperService",
      erro: "500",
    });
  }

  // Verifique se callScrapperService é uma matriz antes de usar o filter
  if (Array.isArray(callScrapperService)) {
    // Filtrar os itens NaN da lista e encontrar o item mais caro
    let highestPriceCents = 0;
    let highestPriceItem: ProductScrapper | null = null;

    const items: ProductScrapper[] = callScrapperService.filter(
      (item: ProductScrapper) => {
        if (typeof item.price === "string") {
          const priceWithoutCurrency = parseFloat(
            item.price.replace(/[^\d.,]/g, "").replace(",", ".")
          );

          // Verifique se priceWithoutCurrency não é NaN
          if (!isNaN(priceWithoutCurrency)) {
            const priceCents = (priceWithoutCurrency * 100).toFixed(2); // Formatar com 2 casas decimais
            item.price = priceCents;
            if (parseFloat(priceCents) > highestPriceCents) {
              highestPriceCents = parseFloat(priceCents);
              highestPriceItem = item;
            }
            console.log(priceCents);
            return true;
          }
        }
        return false;
      }
    );

    return res.json(items);
  } else {
    return res.status(500).send({
      message: "ScrapperService did not return an array",
      erro: "500",
    });
  }
});

export default route;