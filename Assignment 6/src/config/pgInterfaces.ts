import Book from "../models/Books";

export interface IPgService {
  getAllBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
  createBook(bookData: Partial<Book>): Promise<Book>;
  updateBook(id: string, updateData: Partial<Book>): Promise<Book | null>;
  deleteBook(id: string, updateData: Partial<Book>): Promise<Book | null>;
}
