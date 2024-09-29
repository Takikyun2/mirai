import { Model } from "objection";

export class User extends Model {
  static tableName = "users"; // nome da tabela no banco

  id!: number; // chave primária
  username!: string; // nome de usuario
  email!: string; // email
  password!: string; // hash da senha
  role!: string; // permissão
  created_At!: string; // data de criação

  // relacionamentos

  static relationMappings = {
    videos: {
      // nome do relacionamento
      relation: Model.HasManyRelation, // relacionamento de muitos para um
      modelClass: `${__dirname}/video`, // classe do relacionamento
      join: {
        from: "users.id", // coluna da tabela que contém a chave primária
        to: "videos.user_id", // coluna da tabela que contém a chave estrangeira
      },
    },
  };
}
