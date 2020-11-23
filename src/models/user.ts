import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Notice } from "./notice";
import { Loan } from "./loan";

export class User extends Model {
  uuid: string;
  userId: string;
  password: string;
  name: string;
  school: string;
  studentNo: string;
  admin: boolean;
}

User.init(
  {
    uuid: {
      type: Sequelize.STRING(50),
      primaryKey: true,
    },
    userId: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
      field: "user_id",
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    school: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    studentNo: {
      type: Sequelize.CHAR(4),
      allowNull: false,
      field: "student_no",
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "user" }
);

User.hasMany(Notice, { foreignKey: "userUuid", sourceKey: "uuid" });
Notice.belongsTo(User, { foreignKey: "userUuid" });

User.hasMany(Loan, { foreignKey: "userUuid", sourceKey: "uuid" });
Loan.belongsTo(User, { foreignKey: "userUuid" });
