import fastify from "fastify";
import cors from "@fastify/cors";
import { scrapperRoutes } from "./scrapper";

const app = fastify();
app.register(scrapperRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server online - Running on localhost:3333");
  });
