import { Request, Response, NextFunction } from "express";
import { IBookLoan } from "../interfaces/book";
import { searchByWord, loanBook } from "../services/book";

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

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body["userUuid"] = req["decoded"]["uuid"];
  await loanBook(req.body as IBookLoan);
  res.status(201).end();
};
