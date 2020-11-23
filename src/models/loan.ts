import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Loan extends Model {
  uuid: string;
  userUuid: string;
  bookId: string;
  createdAt: string;
}

Loan.init(
  {
    uuid: {
      type: Sequelize.STRING(50),
      primaryKey: true,
    },
    userUuid: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: "user_uuid",
    },
    bookId: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: "book_id",
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_at",
    },
  },
  { sequelize, modelName: "loan" }
);
