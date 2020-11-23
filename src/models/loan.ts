import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Loan extends Model {
  uuid: string;
  userUuid: string;
  bookId: string;
  createdAt: string;
  deletedAt: string;
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
      type: Sequelize.STRING(30),
      field: "created_at",
    },
    deletedAt: {
      type: Sequelize.STRING(30),
      field: "deleted_at",
    },
  },
  { sequelize, modelName: "loan" }
);
