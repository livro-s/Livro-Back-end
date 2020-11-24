import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Notice extends Model {
  uuid: string;
  title: string;
  content: string;
  coverImg: string;
  userUuid: string;
  createdAt: string;
}

Notice.init(
  {
    uuid: {
      type: Sequelize.STRING(50),
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(500),
    },
    userUuid: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    school: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_at",
    },
  },
  { sequelize, modelName: "notice" }
);
