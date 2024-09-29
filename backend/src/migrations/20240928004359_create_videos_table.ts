import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("videos", (table) => {
    // funcão para criar tabela
    table.increments("id").primary(); // chave primária
    table
      .integer("user_id") // chave estrangeira
      .unsigned()
      .references("id") // nome da coluna referenciada
      .inTable("users") // nome da tabela referenciada
      .onDelete("cascade"); // definindo chave estrangeira do autor
    table.string("title", 255).notNullable(); // nome do video
    table.text("description"); // descricão
    table.text("video_url").notNullable(); // url do video
    table.text("thumbnail_url"); // url da miniatura
    table.integer("views").defaultTo(0); // quantidade de visualizações
    table.timestamp("created_at").defaultTo(knex.fn.now()); // data de criação
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("videos"); // funcão para apagar tabela
}
