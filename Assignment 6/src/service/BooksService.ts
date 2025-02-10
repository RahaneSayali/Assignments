import Book from "../models/Books";
import { fetchBookFromExternalAPI } from "../utils/FetchExternalBooks";
import { v4 as uuidv4 } from "uuid";
export const getAllBooks = async () => {
  try {
    const books = await Book.findAll(); //db books

    const enrichedBooks = await Promise.all(
      books.map(async (book) => {
        const externalBookData = await fetchBookFromExternalAPI(book.title);
        const bookLink = `http://localhost:5000/Books/${book.id}`;

        return {
          ...book.toJSON(), //db books
          externalData: externalBookData, //books from  external API
          link: bookLink,
        };
      })
    );

    return enrichedBooks;
  } catch (error: any) {
    throw new Error("Failed to fetch all books: " + error.message);
  }
};

export const getBookById = async (id: string) => {
  return await Book.findByPk(id);
};

export const createBook = async (
  title: string,
  author: string,
  description?: string
) => {
  try {
    // Fetch additional data from external API
    const externalBookData = await fetchBookFromExternalAPI(title);

    const bookCode = `BOOK-${Math.floor(1000 + Math.random() * 9000)}`;

    const publishedYear = externalBookData?.publishedDate
      ? parseInt(externalBookData.publishedDate.split("-")[0]) ||
        new Date().getFullYear()
      : new Date().getFullYear();

    const newBook = await Book.create({
      bookCode,
      title,
      author,
      description:
        description ||
        externalBookData?.description ||
        "No description available",
      publishedYear,
      price: 0, //default
      externalId: externalBookData?.id,
    });

    return newBook;
  } catch (error) {
    throw new Error(`Failed to create book: ${(error as Error).message}`);
  }
};

export const getBookByIdService = async (bookId: string) => {
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return null;
    }

    const externalBookData = await fetchBookFromExternalAPI(book.title);
    return {
      ...book.toJSON(),
      externalData: externalBookData,
    };
  } catch (error: any) {
    throw new Error("Error fetching book by ID: " + error.message);
  }
};

export const updateBook = async (id: string, updateData: any) => {
  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return null;
    }

    const updatedBook = await book.update(updateData);

    return updatedBook;
  } catch (error) {
    throw new Error("Error updating book: " + error);
  }
};

export const deleteBook = async (id: string) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return null;
    }
    await book.destroy();
    return book;
  } catch (error) {
    throw new Error("Error deleting book: " + error);
  }
};
