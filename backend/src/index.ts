import express from "express";
import knex from "knex";
import knexConfig from "../knexfile";

const app = express();
const db = knex(knexConfig.development);

app.use(express.json());

db.raw("SELECT 1+1 AS result")
  .then(() => {
    console.log("conectando ao banco de dados PostgreSQL!");
  })
  .catch((err) => {
    console.error("erro ao conectar ao banco de dados PostgreSQL:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
