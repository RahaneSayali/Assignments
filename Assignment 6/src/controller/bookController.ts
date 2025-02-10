import { Request, Response } from "express";
import { getAllBooks, getBookByIdService } from "../service/BooksService";
import { fetchBookFromExternalAPI } from "../utils/FetchExternalBooks";
import * as bookService from "../service/BooksService";

export const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.json(books); // Return the list of books with the external data
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all books" });
  }
};
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bookId = req.params.id;
  try {
    const book = await getBookByIdService(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book details" });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
    }

    const newBook = await bookService.createBook(title, description);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
};

export const updateBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, price, publishedYear } = req.body;

    const updatedBook = await bookService.updateBook(id, {
      title,
      description,
      price,
      publishedYear,
    });

    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update book" });
  }
};

export const deleteBookController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.deleteBook(id);
    if (deletedBook) {
      res
        .status(200)
        .json({ message: "Book deleted successfully", deletedBook });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};
