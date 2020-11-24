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
      return {
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        category: book.category,
        location: book.location,
        loanable: await isLoanable(book),
        image: book.image,
      };
    })
  );

  return result;
};

const isLoanable = async (book: Book) => {
  const loaned = await Loan.findAll({
    where: {
      bookId: book.id,
    },
  });

  return !Boolean(loaned.length);
};
