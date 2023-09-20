import fastify from "fastify";
import cors from "@fastify/cors";

const app = fastify();
app.get("/", async (req, res) => {
  return res.send("Ola mundo");
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server online - Running on localhost:3333");
  });
