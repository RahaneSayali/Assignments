import { Router } from "express";
import {
  authenticate,
  authorizeAdmin,
  authorizeUser,
} from "../middlewares/auth";

const bookRouter = Router();

bookRouter.get("/") //get books
bookRouter.get("/:id") //get book by id
bookRouter.post("/") //create book
bookRouter.put("/:id") //update book
bookRouter.delete("/:id") //delete book



export { bookRouter };
