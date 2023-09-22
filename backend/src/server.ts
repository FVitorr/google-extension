import express, { Request, Response, Router } from "express";
import route from "./get-scrapper";
const app = express();
app.use(express.json());
app.use(route);


app.listen(3333, () => {
  console.log("online");
});
