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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
//import * as bookService from "../service/BooksService";
const inversify_1 = require("inversify");
let BooksController = class BooksController {
    constructor(bookService) {
        this.bookService = bookService;
        this.getAllBooksController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookService.getAllBooks();
                res.json(books);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch books" });
            }
        });
        this.getBookByIdController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const bookId = req.params.id;
            try {
                const book = yield this.bookService.getBookById(bookId);
                if (book) {
                    res.status(200).json(book);
                }
                else {
                    res.status(404).json({ error: "Book not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch book details" });
            }
        });
        this.addBookController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, author, description } = req.body;
                const newBook = yield this.bookService.createBook(title, author, description);
                res.status(201).json(newBook);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to create book" });
            }
        });
        this.updateBookController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                // console.log("Update Request Received for ID:", id); --debugging purpose
                // console.log("Update Data:", updateData);
                const existingBook = yield this.bookService.getBookById(id);
                if (!existingBook) {
                    res.status(404).json({ error: "Book not found" });
                    return;
                }
                console.log("Existing Book:", existingBook);
                const updatedBook = yield this.bookService.updateBook(existingBook.uId, updateData);
                if (updatedBook) {
                    res.status(200).json(updatedBook);
                }
                else {
                    res.status(404).json({ error: "Book not found" });
                }
            }
            catch (error) {
                console.error("Error in updateBookController:", error);
                res.status(500).json({ error: "Failed to update book" });
            }
        });
        this.deleteBookController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedBook = yield this.bookService.deleteBook(id);
                if (deletedBook) {
                    res
                        .status(200)
                        .json({ message: "Book deleted successfully", deletedBook });
                }
                else {
                    res.status(404).json({ error: "Book not found" });
                }
            }
            catch (error) {
                console.error("Error in deleteBookController:", error);
                res.status(500).json({ error: "Failed to delete book" });
            }
        });
    }
};
exports.BooksController = BooksController;
exports.BooksController = BooksController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IBookService")),
    __metadata("design:paramtypes", [Object])
], BooksController);
// export const getAllBooksController = async (req: Request, res: Response) => {
//   try {
//     const books = await getAllBooks();
//     res.json(books); // Return the list of books with the external data
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch all books" });
//   }
// };
// export const getBookById = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const bookId = req.params.id;
//   try {
//     const book = await getBookByIdService(bookId);
//     if (book) {
//       res.status(200).json(book);
//     } else {
//       res.status(404).json({ error: "Book not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch book details" });
//   }
// };
// export const addBook = async (req: Request, res: Response) => {
//   try {
//     const { title, description } = req.body;
//     if (!title) {
//       res.status(400).json({ error: "Title is required" });
//     }
//     const newBook = await bookService.createBook(title, description);
//     res.status(201).json(newBook);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create book" });
//   }
// };
// export const updateBookController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { title, description, price, publishedYear } = req.body;
//     const updatedBook = await bookService.updateBook(id, {
//       title,
//       description,
//       price,
//       publishedYear,
//     });
//     if (updatedBook) {
//       res.status(200).json(updatedBook);
//     } else {
//       res.status(404).json({ error: "Book not found" });
//     }
//   } catch (error: any) {
//     res.status(500).json({ error: "Failed to update book" });
//   }
// };
// export const deleteBookController = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deletedBook = await bookService.deleteBook(id);
//     if (deletedBook) {
//       res
//         .status(200)
//         .json({ message: "Book deleted successfully", deletedBook });
//     } else {
//       res.status(404).json({ error: "Book not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete book" });
//   }
// };
//# sourceMappingURL=bookController.js.map