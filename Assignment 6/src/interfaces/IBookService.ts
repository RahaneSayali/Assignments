import Book from "../models/Books";

export interface IBookService {
  getAllBooks(): Promise<any>;

  getBookById(id: string): Promise<any>;
  createBook(
    title: string,
    author: string,
    description?: string
  ): Promise<Book>;
  updateBook(id: string, updateData: Partial<Book>): Promise<Book | null>;
  deleteBook(id: string): Promise<Book | null>;
}
