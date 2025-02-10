import { Router } from "express";
import {
  addAuthor,
  fetchAuthorById,
  getAllAuthors,
} from "../controller/authorController";
import { authenticate, authorizeAdmin } from "../middlewares/auth";
const authorRouter = Router();

authorRouter.get("/", authenticate, getAllAuthors); //get all authors
authorRouter.get("/:id", fetchAuthorById); //get author by id
authorRouter.post("/", authenticate, authorizeAdmin, addAuthor); //create new author
authorRouter.put("/:id"); //update author by id
authorRouter.delete("/:id"); //delete author by id

export { authorRouter };
