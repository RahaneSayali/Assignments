import { Router } from "express";
import {
  authenticate,
  authorizeAdmin,
  authorizeUser,
} from "../middlewares/auth";
import {
  addBook,
  deleteBookController,
  getAllBooksController,
  getBookById,
  updateBookController,
} from "../controller/bookController";

const bookRouter = Router();

bookRouter.get("/", authenticate, getAllBooksController); //get books
bookRouter.get("/:id", authenticate, getBookById); //get book by id
bookRouter.post("/", authenticate, authorizeAdmin, addBook); //create book
bookRouter.put("/:id", authenticate, authorizeAdmin, updateBookController); //update book
bookRouter.delete("/:id",authenticate,authorizeAdmin,deleteBookController); //delete book

export { bookRouter };
