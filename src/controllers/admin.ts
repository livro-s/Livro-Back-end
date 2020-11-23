import { Request, Response, NextFunction } from "express";
import { IAdminAuthDTO } from "../interfaces/admin";
import * as AdminService from "../services/admin";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await AdminService.adminAuthService(req.body as IAdminAuthDTO);
  res.status(200).json(token);
};
