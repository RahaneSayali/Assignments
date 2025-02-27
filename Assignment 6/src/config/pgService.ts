import Book from "../models/Books";
import { IPgService } from "./pgInterfaces";
import { v4 as uuidv4 } from "uuid";

export class PgService implements IPgService {
  async getAllBooks() {
    return await Book.findAll();
  }

  async getBookById(id: string) {
    return await Book.findByPk(id);
  }

  async createBook(bookData: Book) {
    return await Book.create(bookData);
  }

  async updateBook(id: string, updateData: any) {
    const book = await Book.findByPk(id);
    if (!book) return null;
    return await book.update(updateData);
  }

  async archiveBook(id: string) {
    const book = await Book.findByPk(id);
    if (!book) return null;

    return await book.update({ isActive: false, archived: true });
  }

  async deleteBook(id: string, updateData: any) {
    const existingBook = await Book.findByPk(id);
    if (!existingBook) {
      console.error("Book not found with id:", id);
      return null;
    }
    return await existingBook?.update(updateData);
  }
}
