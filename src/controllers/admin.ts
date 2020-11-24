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
