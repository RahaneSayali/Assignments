import Book from "../models/Books";
import { fetchBookFromExternalAPI } from "../utils/FetchExternalBooks";
import { v4 as uuidv4 } from "uuid";
import { injectable, inject } from "inversify";
import { IBookService } from "../interfaces/IBookService";
// import { PgService } from "../config/pgService";
import { IPgService } from "../config/pgInterfaces";

// export const getAllBooks = async () => {
//   try {
//     const books = await Book.findAll(); //db books

//     const enrichedBooks = await Promise.all(
//       books.map(async (book) => {
//         const externalBookData = await fetchBookFromExternalAPI(book.title);
//         const bookLink = `http://localhost:5000/Books/${book.id}`;

//         return {
//           ...book.toJSON(), //db books
//           externalData: externalBookData, //books from  external API
//           link: bookLink,
//         };
//       })
//     );

//     return enrichedBooks;
//   } catch (error: any) {
//     throw new Error("Failed to fetch all books: " + error.message);
//   }
// };

@injectable()
export class BookService implements IBookService {
  private pgService: IPgService;

  constructor(@inject("IPgService") pgService: IPgService) {
    this.pgService = pgService;
  }

  async getAllBooks() {
    try {
      const books = await this.pgService.getAllBooks();
      const enrichedBooks = await Promise.all(
        books.map(async (book) => {
          if (!book.uId) {
            book.uId = uuidv4();
            await book.save();
          }
          const externalBookData = await fetchBookFromExternalAPI(book.title);
          return {
            ...book.toJSON(),
            externalData: externalBookData,
            link: `http://localhost:8080/Books/${book.id}`,
          };
        })
      );
      return enrichedBooks;
    } catch (error) {
      throw new Error("failed to fetch all Books:");
    }
  }

  async getBookById(id: string) {
    return await this.pgService.getBookById(id);
  }

  async createBook(title: string, author: string, description?: string) {
    try {
      const externalBookData = await fetchBookFromExternalAPI(title);
      const bookCode = `BOOK-${Math.floor(1000 + Math.random() * 9000)}`;
      const publishedYear = externalBookData?.publishedDate
        ? parseInt(externalBookData.publishedDate.split("-")[0]) ||
          new Date().getFullYear()
        : new Date().getFullYear();

      const bookData = {
        id: uuidv4(),

        bookCode,
        title,
        author,
        description:
          description ||
          externalBookData?.description ||
          "No description available",
        publishedYear,
        price: 0,
        externalId: externalBookData?.id,
        version: 1,
        isActive: true,
        archived: false,
      };

      return await this.pgService.createBook(bookData);
    } catch (error) {
      throw new Error(`Failed to create book: ${(error as Error).message}`);
    }
  }

  async updateBook(uId: string, updateData: any) {
    try {
      const existingBook = await Book.findOne({
        where: { uId },
        order: [["version", "DESC"]],
      });

      if (!existingBook) {
        throw new Error("Book not found");
      }
      console.log("Updating book with uId:", existingBook.uId);

      await this.pgService.updateBook(existingBook.id, {
        isActive: true,
        archived: true,
      });

      const newBookData = {
        bookCode: `BOOK-${Math.floor(1000 + Math.random() * 9000)}`,
        uId: existingBook.uId,
        id: uuidv4(),
        version: existingBook.version + 1,
        title: updateData.title ?? existingBook.title,
        author: updateData.author ?? existingBook.author,
        publishedYear: updateData.publishedYear ?? existingBook.publishedYear,
        price: updateData.price ?? existingBook.price,
        updatedAt: new Date(),
        archived: false,
        isActive: true,
      };
      console.log("New Book Version Data:", newBookData);
      const newBookVersion = await Book.create(newBookData);

      return newBookVersion;
    } catch (error) {
      console.error("Error in updateBook:", error);

      throw new Error(`Update failed: ${(error as Error).message}`);
    }
  }

  async deleteBook(id: string) {
    try {
      const existingBook = await Book.findByPk(id);
      if (!existingBook) {
        console.error("Book not found with id:", id);
        return null;
      }
      console.log("Archiving book:", existingBook.id);

      await this.pgService.deleteBook(existingBook.id, {
        isActive: false,
        archived: true,
      });

      const newBookData = {
        bookCode: `BOOK-${Math.floor(1000 + Math.random() * 9000)}`,
        uId: existingBook.uId,
        id: uuidv4(),
        version: existingBook.version + 1,
        title: existingBook.title,
        author: existingBook.author,
        publishedYear: existingBook.publishedYear,
        price: existingBook.price,
        updatedAt: new Date(),
        isActive: false,
        archived: true,
      };
      console.log("Creating new archived book version with data:", newBookData);
      return await Book.create(newBookData);
    } catch (error) {
      console.error("Error in deleteBook:", error);
      throw new Error(`Delete failed: ${(error as Error).message}`);
    }
  }
}

// export const getBookById = async (id: string) => {
//   return await Book.findByPk(id);
// };

// export const createBook = async (
//   title: string,
//   author: string,
//   description?: string
// ) => {
//   try {
//     // Fetch additional data from external API
//     const externalBookData = await fetchBookFromExternalAPI(title);

//     const bookCode = `BOOK-${Math.floor(1000 + Math.random() * 9000)}`;

//     const publishedYear = externalBookData?.publishedDate
//       ? parseInt(externalBookData.publishedDate.split("-")[0]) ||
//         new Date().getFullYear()
//       : new Date().getFullYear();

//     const newBook = await Book.create({
//       bookCode,
//       title,
//       author,
//       description:
//         description ||
//         externalBookData?.description ||
//         "No description available",
//       publishedYear,
//       price: 0, //default
//       externalId: externalBookData?.id,
//     });

//     return newBook;
//   } catch (error) {
//     throw new Error(`Failed to create book: ${(error as Error).message}`);
//   }
// };

// export const getBookByIdService = async (bookId: string) => {
//   try {
//     const book = await Book.findByPk(bookId);
//     if (!book) {
//       return null;
//     }

//     const externalBookData = await fetchBookFromExternalAPI(book.title);
//     return {
//       ...book.toJSON(),
//       externalData: externalBookData,
//     };
//   } catch (error: any) {
//     throw new Error("Error fetching book by ID: " + error.message);
//   }
// };

// export const updateBook = async (id: string, updateData: any) => {
//   try {
//     const book = await Book.findByPk(id);

//     if (!book) {
//       return null;
//     }

//     const updatedBook = await book.update(updateData);

//     return updatedBook;
//   } catch (error) {
//     throw new Error("Error updating book: " + error);
//   }
// };

// export const deleteBook = async (id: string) => {
//   try {
//     const book = await Book.findByPk(id);
//     if (!book) {
//       return null;
//     }
//     await book.destroy();
//     return book;
//   } catch (error) {
//     throw new Error("Error deleting book: " + error);
//   }
// };
