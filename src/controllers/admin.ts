import { Request, Response, NextFunction } from "express";
import { IAdminAuthDTO, IWriteNoticeDTO } from "../interfaces/admin";
import * as AdminService from "../services/admin";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret: string = req.app.get("jwt-secret");
  const accessToken = await AdminService.adminAuthService(
    req.body as IAdminAuthDTO,
    secret
  );
  res.status(200).json({ accessToken });
};

export const writeNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid, admin }: { uuid: string; admin: boolean } = req["decoded"];
  await AdminService.writeNoticeService(
    req.body as IWriteNoticeDTO,
    uuid,
    admin
  );
  res.status(201).end();
};

export const deleteNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const noticeId: string = req.params.id;
  const { uuid, admin }: { uuid: string; admin: boolean } = req["decoded"];
  await AdminService.deleteNoticeService(noticeId, uuid, admin);
  res.status(204).end();
};

export const updateNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const noticeId: string = req.params.id;
  const { uuid, admin }: { uuid: string; admin: boolean } = req["decoded"];
  await AdminService.updateNoticeService(
    req.body as IWriteNoticeDTO,
    noticeId,
    uuid,
    admin
  );
  res.status(200).end();
};

export const getLonedBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid, admin }: { uuid: string; admin: boolean } = req["decoded"];
  const { page, date }: any = req.query;
  const books = await AdminService.getLonedBooksService(
    uuid,
    admin,
    page,
    date
  );
  res.status(200).json(books);
};

export const getDelaiedBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid, admin }: { uuid: string; admin: boolean } = req["decoded"];
  const { page, date }: any = req.query;
  const books = await AdminService.getDelaiedBooksService(
    uuid,
    admin,
    page,
    date
  );
  res.status(200).json(books);
};

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin: boolean = req["decoded"];
  const uuid: string = req.params.id;
  await AdminService.returnBookService(admin, uuid);
  res.status(200).end();
};
