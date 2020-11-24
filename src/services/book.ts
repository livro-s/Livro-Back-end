import { Book } from "../models/book";
import { Loan } from "../models/loan";
import { Op } from "sequelize";

export const searchByWord = async (word: string, page: number) => {
  const books = await Book.findAll({
    where: {
      title: {
        [Op.like]: `%${word}%`,
      },
    },
    limit: 5,
    offset: (page - 1) * 5,
  });

  const result = await Promise.all(
    books.map(async (book) => {
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

  return result;
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
