import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Notice extends Model {
  uuid: string;
  title: string;
  content: string;
  userUuid: string;
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
  },
  { sequelize, modelName: "notice" }
);
