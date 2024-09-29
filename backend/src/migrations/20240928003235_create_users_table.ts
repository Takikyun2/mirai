import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    // funcão para criar tabela
    table.increments("id").primary(); // chave primária
    table.string("username", 50).unique().notNullable(); // nome de usuario
    table.string("email", 100).unique().notNullable(); // email
    table.text("password_hash").notNullable(); // hash da senha
    table.string("role", 20).defaultTo("user"); // permissão
    table.timestamp("created_at").defaultTo(knex.fn.now()); // data de criação
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users"); // funcão para apagar tabela
}
