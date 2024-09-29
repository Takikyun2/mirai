import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("comments", (table) => {
    // funcão para criar tabela
    table.increments("id").primary(); // chave primária
    table
      .integer("video_id") // chave estrangeira
      .unsigned()
      .references("id") // nome da coluna referenciada
      .inTable("videos") // nome da tabela referenciada
      .onDelete("cascade"); // chave estrangeira do video
    table
      .integer("user_id") // chave estrangeira
      .unsigned()
      .references("id") // nome da coluna referenciada
      .inTable("users") // nome da tabela referenciada
      .onDelete("cascade"); // chave estrangeira do usuario
    table.text("comment_text").notNullable(); // texto do comentario
    table.timestamp("created_at").defaultTo(knex.fn.now()); // data de criação
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("comments"); // funcão para apagar tabela
}
