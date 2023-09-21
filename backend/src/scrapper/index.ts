import { FastifyInstance } from "fastify";

export async function scrapperRoutes(app: FastifyInstance) {
  app.get("/home", async (request) => {
   return "ola mundo em rotas"
  });
}
