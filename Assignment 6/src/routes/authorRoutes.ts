import { Router } from "express";
import {
  addAuthor,
  deleteAuthorController,
  fetchAuthorById,
  getAllAuthors,
  updateAuthorController,
} from "../controller/authorController";
import { authenticate, authorizeAdmin } from "../middlewares/auth";
const authorRouter = Router();

authorRouter.get("/", authenticate, getAllAuthors); //get all authors
authorRouter.get("/:id", fetchAuthorById); //get author by id
authorRouter.post("/", authenticate, authorizeAdmin, addAuthor); //create new author
authorRouter.put("/:id", authenticate, authorizeAdmin, updateAuthorController); //update author by id
authorRouter.delete("/:id" ,authenticate,authorizeAdmin,deleteAuthorController); //delete author by id

export { authorRouter };
