"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const bookController_1 = require("../controller/bookController");
let BookRouter = class BookRouter {
    constructor(booksController) {
        this.booksController = booksController;
        this.router = (0, express_1.Router)();
        this.router.get("/", (req, res) => this.booksController.getAllBooksController(req, res));
        this.router.get("/:id", (req, res) => this.booksController.getBookByIdController(req, res));
        this.router.post("/", (req, res) => this.booksController.addBookController(req, res));
        this.router.put("/:id", (req, res) => this.booksController.updateBookController(req, res));
        this.router.delete("/:id", (req, res) => this.booksController.deleteBookController(req, res));
    }
    getRouter() {
        return this.router;
    }
};
exports.BookRouter = BookRouter;
exports.BookRouter = BookRouter = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(bookController_1.BooksController)),
    __metadata("design:paramtypes", [bookController_1.BooksController])
], BookRouter);
// bookRouter.get("/:id", authenticate, getBookById); //get book by id
// bookRouter.post("/", authenticate, authorizeAdmin, addBook); //create book
// bookRouter.put("/:id", authenticate, authorizeAdmin, updateBookController); //update book
// bookRouter.delete("/:id", authenticate, authorizeAdmin, deleteBookController); //delete book
//Router.length("/books", authenticate, bookController.getAllBooks);
// export {BookRouter};
//# sourceMappingURL=bookRoutes.js.map