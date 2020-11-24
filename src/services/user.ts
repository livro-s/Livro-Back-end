import { User } from "../models/user";
import { HttpError } from "../exception/exception";
import { IUserAuthDTO, IUserLoginDTO } from "interfaces/user";
import { hashPassword } from "../utils/hash";
import { mkId } from "../utils/uuid";
import { mkAccess } from "../utils/mkToken";

export const createUser = async (userInfo: IUserAuthDTO) => {
  userInfo.password = await hashPassword(userInfo.password);
  userInfo.uuid = "user-" + (await mkId());

  const existingUser = await User.findOne({
    where: {
      userId: userInfo.userId,
    },
  });

  if (existingUser) throw new HttpError(409, "userId already exists");

  return await User.create(userInfo);
};

export const findUser = async (userInfo: IUserLoginDTO) => {
  const user = await User.findOne({
    where: {
      userId: userInfo.userId,
      password: await hashPassword(userInfo.password),
    },
  });

  if (!user) throw new HttpError(400, "Wrong loginInfo");

  return await mkAccess(user.uuid, user.admin, process.env.JWT_SECRET);
};

export const getUserInfoService = async (id: string): Promise<object> => {
  return await User.findOne({
    where: { uuid: id },
    attributes: ["name", "studentNo"],
  });
};
