import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("video_categories", (table) => {
    // funcão para criar tabela
    table
      .integer("video_id") // chave estrangeira
      .unsigned()
      .references("id") // nome da coluna referenciada
      .inTable("videos") // nome da tabela referenciada
      .onDelete("cascade"); // definindo chave estrangeira do video
    table
      .integer("categories_id") // chave estrangeira
      .unsigned()
      .references("id") // nome da coluna referenciada
      .inTable("categories") // nome da tabela referenciada
      .onDelete("cascade"); // definindo chave estrangeira do categoria
    table.primary(["video_id", "categories_id"]); // definindo chave primária
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("video_categories"); // funcão para apagar tabela
}
