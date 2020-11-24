import { Request, Response, NextFunction } from "express";
import { IUserAuthDTO, IUserLoginDTO } from "interfaces/user";
import {
  createUser,
  findUser,
  getBookLoans,
  getUserInfoService,
} from "../services/user";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await createUser(req.body as IUserAuthDTO);
  res.status(201).end();
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await findUser(req.body as IUserLoginDTO);
  res.status(200).json({
    accessToken: token,
  });
};

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req["decoded"]["uuid"];
  const user: any = await getUserInfoService(uuid);
  res.status(200).json(user);
};

export const getLoanList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid: string = req["decoded"].uuid;
  const loanList = await getBookLoans(uuid);
  res.status(200).json({
    book: loanList,
  });
};
