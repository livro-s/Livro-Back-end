import { Request, Response, NextFunction } from "express";
import * as NoticeService from "../services/notice";

export const getLatestNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid: string = req["decoded"].uuid;
  const notice = await NoticeService.getLatestNoticeService(uuid);
  res.status(200).json(notice);
};

export const getNoticeList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid: string = req["decoded"].uuid;
  const page: any = req.query.page;
  const noticeList = await NoticeService.getNoticeListService(uuid, page);
  res.status(200).json(noticeList);
};
