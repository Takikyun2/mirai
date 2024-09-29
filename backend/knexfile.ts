import { Knex } from "knex";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "admin",
      database: "mirai",
    },
    migrations: {
      directory: "./src/migrations",
    },
  },
};

export default knexConfig;
