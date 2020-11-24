import { Book } from "../models/book";
import { Loan } from "../models/loan";
import { Op } from "sequelize";
import { HttpError } from "../exception/exception";
import { mkId } from "../utils/uuid";
import { IBookLoan } from "../interfaces/book";

export const searchByWord = async (word: string, page: number) => {
  const { rows, count }: any = await Book.findAndCountAll({
    where: {
      title: {
        [Op.like]: `%${word}%`,
      },
    },
    limit: 5,
    offset: (page - 1) * 5,
  });

  const result = await Promise.all(
    rows.map(async (book) => {
      const { loanable, returnDate } = await getLoanState(book);
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        category: book.category,
        location: book.location,
        loanable: loanable,
        returnDate: returnDate,
        image: book.image,
      };
    })
  );

  return { book: result, pages: Math.ceil(count / 5) };
};

export const loanBook = async (bookLoan: IBookLoan) => {
  const count = await Loan.count({
    where: {
      user_uuid: bookLoan.userUuid,
    },
  });
  if (count >= 3) throw new HttpError(409, "already loaned 3books");

  const { loanable, returnDate } = await getLoanState(
    await Book.findOne({
      where: {
        id: bookLoan.id,
      },
    })
  );
  if (!loanable) throw new HttpError(400, "already loaned book");

  await Loan.create({
    uuid: "loan-" + (await mkId()),
    userUuid: bookLoan.userUuid,
    bookId: bookLoan.id,
    createdAt: bookLoan.loanDate,
    deletedAt: bookLoan.returnDate,
  });
};

export const getBookInfo = async (id: string) => {
  return await Book.findOne({
    where: {
      id: id,
    },
  });
};

const getLoanState = async (book: Book) => {
  const loaned = await Loan.findAll({
    where: {
      bookId: book.id,
    },
  });

  const loanable = !Boolean(loaned.length);
  let returnDate;
  if (!loanable) {
    returnDate = loaned[0].deletedAt;
  }
  return { loanable: loanable, returnDate: returnDate };
};
