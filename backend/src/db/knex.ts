import knex from "knex"; // importa o construtor knex
import { Model } from "objection"; // importa o objeto Model
import knexConfig from "../../knexfile"; // carrega o arquivo de configuração do knex

const knexInstance = knex(knexConfig.development); // cria uma instância do knex
Model.knex(knexInstance); // associa o knex ao objeto Model

export default knexInstance; // exporta a instância
