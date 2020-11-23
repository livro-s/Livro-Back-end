import { HttpError } from "exception/exception";
import { IAdminAuthDTO } from "../interfaces/admin";
import { User } from "../models/user";

export const adminAuthService = async (adminAuthDTO: IAdminAuthDTO) => {
  const user = await findOneUser(adminAuthDTO.userId);
  if (!isAdmin(user)) throw new HttpError(409, "User Not Admin");
};

const isAdmin = async (user: any): Promise<boolean> => {
  return user.admin ? true : false;
};

const findOneUser = async (userId: string): Promise<object> => {
  try {
    return User.findOne({ where: { userId } });
  } catch (e) {
    throw new HttpError(404, "User Not Found");
  }
};
