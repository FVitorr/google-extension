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
    return res.send({
      message: "Invalid value",
      erro: "500",
    });
  }

  const callScrapperService = await ScrapperService(productName);

  if (!callScrapperService) {
    return res.status(500).send({
      message: "Error calling ScrapperService",
      erro: "500",
    });
  }
});

export default route;
