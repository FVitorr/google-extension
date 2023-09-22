import { Request, Response, Router } from "express";
import { ScrapperService } from "../services/scrapper";
const route = Router();

type ProductProps = {
  productName: string;
};

route.post("/teste", async (req: Request, res: Response) => {
  const { productName } = req.body as ProductProps;
  if (productName.length <= 0) {
    return res.status(404).send({
      message: "Invalid value",
      erro: "404",
    });
  }
  const callScrapperService = await ScrapperService(productName);
  const result = JSON.stringify(callScrapperService);
  return res.send(result);
});

export default route;
