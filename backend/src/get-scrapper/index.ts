import { Request, Response, Router } from "express";
import { ScrapperService } from "../services/scrapper";
const route = Router();

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
  console.log(productName)
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
            const priceCents = Math.round(priceWithoutCurrency * 100); // Converter para centavos
            item.price = priceCents;
            if (priceCents > highestPriceCents) {
              highestPriceCents = priceCents;
              highestPriceItem = item;
            }
            return true;
          }
        }
        return false;
      }
    );

    // Verificar se foi encontrado um item mais caro
    if (highestPriceItem) {
      // Filtrar os itens cujo preço não é 30% ou mais baixo que o preço mais caro
      const filteredItems = items.filter((item) => {
        // Verifique se item.price é um número antes de comparar
        if (typeof item.price === "number") {
          return item.price < highestPriceCents * 0.9; // 10% menor que o maior preço
        }
        return false; // ou true, dependendo do seu critério para valores não numéricos
      });

     
      const result = JSON.stringify({
        items: filteredItems,
        highestPriceItem
      });

      return res.send(result);
    } else {
      return res.status(500).send({
        message: "Error finding the highest price item",
        erro: "500",
      });
    }
  } else {
    return res.status(500).send({
      message: "ScrapperService did not return an array",
      erro: "500",
    });
  }
});

export default route;
