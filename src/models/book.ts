import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Loan } from "./loan";

export class Book extends Model {
  id: string;
  title: string;
  author: string;
  publisher: string;
  category: string;
  location: string;
}

Book.init(
  {
    id: {
      type: Sequelize.STRING(10),
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    publisher: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(200),
      defaultValue:
        "https://olio-image.s3.us-east-2.amazonaws.com/livro/book.jfif",
    },
  },
  {
    sequelize,
    modelName: "book",
  }
);

Book.hasMany(Loan, { foreignKey: "bookId", sourceKey: "id" });
Loan.belongsTo(Book, { foreignKey: "bookId" });
