"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const bookController_1 = require("../controller/bookController");
const bookRouter = (0, express_1.Router)();
exports.bookRouter = bookRouter;
bookRouter.get("/", auth_1.authenticate, bookController_1.getAllBooksController); //get books
bookRouter.get("/:id", auth_1.authenticate, bookController_1.getBookById); //get book by id
bookRouter.post("/", auth_1.authenticate, auth_1.authorizeAdmin, bookController_1.addBook); //create book
bookRouter.put("/:id", auth_1.authenticate, auth_1.authorizeAdmin, bookController_1.updateBookController); //update book
bookRouter.delete("/:id", auth_1.authenticate, auth_1.authorizeAdmin, bookController_1.deleteBookController); //delete book
