import { HttpError } from "../exception/exception";
import { IAdminAuthDTO, IWriteNoticeDTO } from "../interfaces/admin";
import { User } from "../models/user";
import { Notice } from "../models/notice";
import { mkAccess } from "../utils/mkToken";
import { hashPassword } from "../utils/hash";
import { mkId } from "../utils/uuid";

export const adminAuthService = async (
  adminAuthDTO: IAdminAuthDTO,
  secret: string
) => {
  const { userId, password }: IAdminAuthDTO = adminAuthDTO;
  const user: User = await findOneUser(userId);
  if (!passwordCompare(password, user.password))
    throw new HttpError(404, "User Not Found");
  await isAdmin(user.admin);
  return await mkAccess(user.uuid, user.admin, secret);
};

const findOneUser = async (userId: string): Promise<User> => {
  try {
    return User.findOne({ where: { userId } });
  } catch (e) {
    throw new HttpError(404, "User Not Found");
  }
};

const isAdmin = async (admin: boolean) => {
  if (!admin) throw new HttpError(409, "User Not Admin");
};

const passwordCompare = async (password: string, hashedPassword: string) => {
  return (await hashPassword(password)) === hashedPassword;
};

export const writeNoticeService = async (
  writeNoticeDTO: IWriteNoticeDTO,
  uuid: string,
  admin: boolean
) => {
  const noticeId = "notice-" + (await mkId());
  const { title, content }: IWriteNoticeDTO = writeNoticeDTO;
  await isAdmin(admin);
  await Notice.create({
    uuid: noticeId,
    title,
    content,
    userUuid: uuid,
  });
};
