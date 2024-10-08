import { Model } from "objection";
import knexInstance from "../db/knex"; // importa a instância do knex

Model.knex(knexInstance); // associa o knex ao objeto Model

export class Video extends Model {
  static tableName: "videos"; // nome da tabela

  id!: number;
  user_id!: number;
  title!: string;
  description!: string;
  video_url!: string;
  thumbnail_url!: string;
  views!: number;
  created_at!: string;

  static relationMappings = {
    users: {
      // relacionamento com a tabela users
      relation: Model.BelongsToOneRelation, // relacionamento de um para muitos
      modelClass: `${__dirname}/User`, // classe do relacionamento
      join: {
        from: "videos.user_id", // coluna da tabela que contém a chave primária
        to: "users.id", // coluna da tabela que contém a chave estrangeira
      },
    },
  };
}
