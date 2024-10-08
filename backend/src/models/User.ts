import { Model } from "objection"; // importa o objeto Model
import knexInstance from "../db/knex"; // importa a instância do knex

Model.knex(knexInstance); // associa o knex ao objeto Model

export class User extends Model {
  static tableName = "users"; // nome da tabela no banco

  id!: number; // chave primária
  username!: string; // nome de usuario
  email!: string; // email
  password_hash!: string; // hash da senha
  role!: string; // permissão
  created_at!: string; // data de criação

  // relacionamentos

  static relationMappings = {
    videos: {
      // relacionamento com a tabela videos
      relation: Model.HasManyRelation, // relacionamento de muitos para um
      modelClass: `${__dirname}/video`, // classe do relacionamento
      join: {
        from: "users.id", // coluna da tabela que contém a chave primária
        to: "videos.user_id", // coluna da tabela que contém a chave estrangeira
      },
    },
  };
}
