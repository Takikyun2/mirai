import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("categories", (table) => { // funcão para criar tabela
    table.increments("id").primary(); // chave primária
    table.string("name", 100).notNullable(); // nome da categoria
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("categories"); // funcão para apagar tabela
}
