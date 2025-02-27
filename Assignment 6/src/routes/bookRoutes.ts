import { Router } from "express";
import { authorizeAdmin, authorizeUser } from "../middlewares/auth";
import { inject, injectable } from "inversify";
import { BooksController } from "../controller/bookController";

@injectable()
export class BookRouter {
  public router: Router;
  constructor(
    @inject(BooksController) private booksController: BooksController
  ) {
    this.router = Router();

    this.router.get("/", (req, res) =>
      this.booksController.getAllBooksController(req, res)
    );

    this.router.get("/:id", (req, res) =>
      this.booksController.getBookByIdController(req, res)
    );

    this.router.post("/", (req, res) =>
      this.booksController.addBookController(req, res)
    );

    this.router.put("/:id", (req, res) =>
      this.booksController.updateBookController(req, res)
    );

    this.router.delete("/:id", (req, res) =>
      this.booksController.deleteBookController(req, res)
    );
    
  }

  public getRouter(): Router {
    return this.router;
  }
}

// bookRouter.get("/:id", authenticate, getBookById); //get book by id
// bookRouter.post("/", authenticate, authorizeAdmin, addBook); //create book
// bookRouter.put("/:id", authenticate, authorizeAdmin, updateBookController); //update book
// bookRouter.delete("/:id", authenticate, authorizeAdmin, deleteBookController); //delete book

//Router.length("/books", authenticate, bookController.getAllBooks);
// export {BookRouter};
