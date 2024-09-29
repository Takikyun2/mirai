import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("likes", (table) => {
    table.increments("id").primary(); // chave primária
    table
      .integer("user_id") // chave estrangeira
      .unsigned()
      .references("id") // nome da coluna referenciada
      .inTable("users") // nome da tabela referenciada
      .onDelete("cascade"); // chave estrangeira do usuario
    table
      .integer("video_id") // chave estrangeira
      .unsigned()
      .references("id") // nome da coluna referenciada
      .inTable("videos") // nome da tabela referenciada
      .onDelete("cascade"); // chave estrangeira do video
    table.boolean("is_like").notNullable().defaultTo(false); // se o usário curtiu o video
    table.timestamp("created_at").defaultTo(knex.fn.now()); // data de criação
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("likes");
}
