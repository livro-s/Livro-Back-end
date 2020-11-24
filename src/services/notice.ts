import { HttpError } from "../exception/exception";
import { Notice } from "../models/notice";
import { User } from "../models/user";
import * as AdminService from "./admin";

export const getLatestNoticeService = async (uuid: string): Promise<object> => {
  const user: User = await AdminService.findOneUserByUuid(uuid);
  return Notice.findOne({
    where: { school: user.school },
    order: [["createdAt", "DESC"]],
    attributes: ["uuid", "title", "content", "createdAt"],
  });
};

export const getNoticeListService = async (
  uuid: string,
  page: any
): Promise<Array<object>> => {
  const user: User = await AdminService.findOneUserByUuid(uuid);
  return Notice.findAll({
    where: { school: user.school },
    order: [["createdAt", "DESC"]],
    attributes: ["uuid", "title", "content", "createdAt"],
    limit: 3,
    offset: (page - 1) * 3,
  });
};
