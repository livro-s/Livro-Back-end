import { HttpError } from "../exception/exception";
import { IAdminAuthDTO, IWriteNoticeDTO } from "../interfaces/admin";
import { User } from "../models/user";
import { Notice } from "../models/notice";
import { Loan } from "../models/loan";
import { mkAccess } from "../utils/mkToken";
import { hashPassword } from "../utils/hash";
import { mkId } from "../utils/uuid";
import { Op } from "sequelize";

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

export const findOneUserByUuid = async (uuid: string): Promise<User> => {
  try {
    return User.findOne({ where: { uuid } });
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
  const user: User = await findOneUserByUuid(uuid);
  await isAdmin(admin);
  await Notice.create({
    uuid: noticeId,
    title,
    content,
    userUuid: uuid,
    school: user.school,
  });
};

export const deleteNoticeService = async (
  noticeId: string,
  uuid: string,
  admin: boolean
) => {
  await isAdmin(admin);
  const notice: Notice = await findOneNotice(noticeId);
  if (notice.userUuid !== uuid)
    throw new HttpError(409, "Not My School Notice");
  await notice.destroy();
};

export const updateNoticeService = async (
  updateNoticeDTO: IWriteNoticeDTO,
  noticeId: string,
  uuid: string,
  admin: boolean
) => {
  const { title, content }: IWriteNoticeDTO = updateNoticeDTO;
  await isAdmin(admin);
  const notice: Notice = await findOneNotice(noticeId);
  if (notice.userUuid !== uuid)
    throw new HttpError(409, "Not My School Notice");
  await notice.update({ title, content });
};

const findOneNotice = async (noticeId: string): Promise<Notice> => {
  try {
    return await Notice.findOne({ where: { uuid: noticeId } });
  } catch (e) {
    throw new HttpError(404, "User Not Found");
  }
};

export const getLonedBooksService = async (
  uuid: string,
  admin: boolean,
  page: any,
  date: any
): Promise<object> => {
  await isAdmin(admin);
  const user: User = await findOneUserByUuid(uuid);
  const loans = await Loan.findAll({
    where: { school: user.school, deletedAt: { [Op.gte]: date } },
    attributes: ["uuid", "bookId", "userUuid"],
    order: [["createdAt", "DESC"]],
    limit: 3,
    offset: (page - 1) * 3,
  });
  return loans;
};

export const getDelaiedBooksService = async (
  uuid: string,
  admin: boolean,
  page: any,
  date: any
): Promise<object> => {
  await isAdmin(admin);
  const user: User = await findOneUserByUuid(uuid);
  return Loan.findAll({
    where: { school: user.school, deletedAt: { [Op.lt]: date } },
    attributes: ["uuid", "bookId", "userUuid"],
    order: [["createdAt", "DESC"]],
    limit: 3,
    offset: (page - 1) * 3,
  });
};

export const returnBookService = async (admin: boolean, bookId: string) => {
  await isAdmin(admin);
  await Loan.destroy({ where: { bookId } });
};
