import { Request, Response, NextFunction } from "express";
import { PassThrough } from "stream";
import { searchByWord } from "../services/book";

export const searchBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { search, page }: any = req.query;
  if (page == undefined) page = 1;

  const books = await searchByWord(search, page);
  res.status(200).json(books);
};
