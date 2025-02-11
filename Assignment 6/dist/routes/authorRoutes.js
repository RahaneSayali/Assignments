"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRouter = void 0;
const express_1 = require("express");
const authorController_1 = require("../controller/authorController");
const auth_1 = require("../middlewares/auth");
const authorRouter = (0, express_1.Router)();
exports.authorRouter = authorRouter;
authorRouter.get("/", auth_1.authenticate, authorController_1.getAllAuthors); //get all authors
authorRouter.get("/:id", authorController_1.fetchAuthorById); //get author by id
authorRouter.post("/", auth_1.authenticate, auth_1.authorizeAdmin, authorController_1.addAuthor); //create new author
authorRouter.put("/:id", auth_1.authenticate, auth_1.authorizeAdmin, authorController_1.updateAuthorController); //update author by id
authorRouter.delete("/:id", auth_1.authenticate, auth_1.authorizeAdmin, authorController_1.deleteAuthorController); //delete author by id
