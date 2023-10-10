import express, { Request, Response, Router } from "express";
import cors from "cors";

import route from "./get-scrapper";
const corsOP = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
const app = express();
app.use(cors(corsOP));
app.use(express.json());
app.use(route);

app.listen(3333, () => {
  console.log("SERVIDOR ONLINE NA PORTA 3333");
});
