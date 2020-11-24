import { Request, Response, NextFunction } from "express";
import { IAdminAuthDTO, IWriteNoticeDTO } from "../interfaces/admin";
import * as AdminService from "../services/admin";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret: string = req.app.get("jwt-secret");
  const token = await AdminService.adminAuthService(
    req.body as IAdminAuthDTO,
    secret
  );
  res.status(200).json(token);
};

export const writeNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid, admin }: { uuid: string; admin: string } = req["decoded"];
};
