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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const Books_1 = __importDefault(require("../models/Books"));
const FetchExternalBooks_1 = require("../utils/FetchExternalBooks");
const uuid_1 = require("uuid");
const inversify_1 = require("inversify");
// export const getAllBooks = async () => {
//   try {
//     const books = await Book.findAll(); //db books
//     const enrichedBooks = await Promise.all(
//       books.map(async (book) => {
//         const externalBookData = await fetchBookFromExternalAPI(book.title);
//         const bookLink = `http://localhost:5000/Books/${book.id}`;
//         return {
//           ...book.toJSON(), //db books
//           externalData: externalBookData, //books from  external API
//           link: bookLink,
//         };
//       })
//     );
//     return enrichedBooks;
//   } catch (error: any) {
//     throw new Error("Failed to fetch all books: " + error.message);
//   }
// };
let BookService = class BookService {
    constructor(pgService) {
        this.pgService = pgService;
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.pgService.getAllBooks();
                const enrichedBooks = yield Promise.all(books.map((book) => __awaiter(this, void 0, void 0, function* () {
                    if (!book.uId) {
                        book.uId = (0, uuid_1.v4)();
                        yield book.save();
                    }
                    const externalBookData = yield (0, FetchExternalBooks_1.fetchBookFromExternalAPI)(book.title);
                    return Object.assign(Object.assign({}, book.toJSON()), { externalData: externalBookData, link: `http://localhost:8080/Books/${book.id}` });
                })));
                return enrichedBooks;
            }
            catch (error) {
                throw new Error("failed to fetch all Books:");
            }
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pgService.getBookById(id);
        });
    }
    createBook(title, author, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const externalBookData = yield (0, FetchExternalBooks_1.fetchBookFromExternalAPI)(title);
                const bookCode = `BOOK-${Math.floor(1000 + Math.random() * 9000)}`;
                const publishedYear = (externalBookData === null || externalBookData === void 0 ? void 0 : externalBookData.publishedDate)
                    ? parseInt(externalBookData.publishedDate.split("-")[0]) ||
                        new Date().getFullYear()
                    : new Date().getFullYear();
                const bookData = {
                    id: (0, uuid_1.v4)(),
                    bookCode,
                    title,
                    author,
                    description: description ||
                        (externalBookData === null || externalBookData === void 0 ? void 0 : externalBookData.description) ||
                        "No description available",
                    publishedYear,
                    price: 0,
                    externalId: externalBookData === null || externalBookData === void 0 ? void 0 : externalBookData.id,
                    version: 1,
                    isActive: true,
                    archived: false,
                };
                return yield this.pgService.createBook(bookData);
            }
            catch (error) {
                throw new Error(`Failed to create book: ${error.message}`);
            }
        });
    }
    updateBook(uId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const existingBook = yield Books_1.default.findOne({
                    where: { uId },
                    order: [["version", "DESC"]],
                });
                if (!existingBook) {
                    throw new Error("Book not found");
                }
                console.log("Updating book with uId:", existingBook.uId);
                yield this.pgService.updateBook(existingBook.id, {
                    isActive: true,
                    archived: true,
                });
                const newBookData = {
                    bookCode: `BOOK-${Math.floor(1000 + Math.random() * 9000)}`,
                    uId: existingBook.uId,
                    id: (0, uuid_1.v4)(),
                    version: existingBook.version + 1,
                    title: (_a = updateData.title) !== null && _a !== void 0 ? _a : existingBook.title,
                    author: (_b = updateData.author) !== null && _b !== void 0 ? _b : existingBook.author,
                    publishedYear: (_c = updateData.publishedYear) !== null && _c !== void 0 ? _c : existingBook.publishedYear,
                    price: (_d = updateData.price) !== null && _d !== void 0 ? _d : existingBook.price,
                    updatedAt: new Date(),
                    archived: false,
                    isActive: true,
                };
                console.log("New Book Version Data:", newBookData);
                const newBookVersion = yield Books_1.default.create(newBookData);
                return newBookVersion;
            }
            catch (error) {
                console.error("Error in updateBook:", error);
                throw new Error(`Update failed: ${error.message}`);
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingBook = yield Books_1.default.findByPk(id);
                if (!existingBook) {
                    console.error("Book not found with id:", id);
                    return null;
                }
                console.log("Archiving book:", existingBook.id);
                yield this.pgService.deleteBook(existingBook.id, {
                    isActive: false,
                    archived: true,
                });
                const newBookData = {
                    bookCode: `BOOK-${Math.floor(1000 + Math.random() * 9000)}`,
                    uId: existingBook.uId,
                    id: (0, uuid_1.v4)(),
                    version: existingBook.version + 1,
                    title: existingBook.title,
                    author: existingBook.author,
                    publishedYear: existingBook.publishedYear,
                    price: existingBook.price,
                    updatedAt: new Date(),
                    isActive: false,
                    archived: true,
                };
                console.log("Creating new archived book version with data:", newBookData);
                return yield Books_1.default.create(newBookData);
            }
            catch (error) {
                console.error("Error in deleteBook:", error);
                throw new Error(`Delete failed: ${error.message}`);
            }
        });
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IPgService")),
    __metadata("design:paramtypes", [Object])
], BookService);
// export const getBookById = async (id: string) => {
//   return await Book.findByPk(id);
// };
// export const createBook = async (
//   title: string,
//   author: string,
//   description?: string
// ) => {
//   try {
//     // Fetch additional data from external API
//     const externalBookData = await fetchBookFromExternalAPI(title);
//     const bookCode = `BOOK-${Math.floor(1000 + Math.random() * 9000)}`;
//     const publishedYear = externalBookData?.publishedDate
//       ? parseInt(externalBookData.publishedDate.split("-")[0]) ||
//         new Date().getFullYear()
//       : new Date().getFullYear();
//     const newBook = await Book.create({
//       bookCode,
//       title,
//       author,
//       description:
//         description ||
//         externalBookData?.description ||
//         "No description available",
//       publishedYear,
//       price: 0, //default
//       externalId: externalBookData?.id,
//     });
//     return newBook;
//   } catch (error) {
//     throw new Error(`Failed to create book: ${(error as Error).message}`);
//   }
// };
// export const getBookByIdService = async (bookId: string) => {
//   try {
//     const book = await Book.findByPk(bookId);
//     if (!book) {
//       return null;
//     }
//     const externalBookData = await fetchBookFromExternalAPI(book.title);
//     return {
//       ...book.toJSON(),
//       externalData: externalBookData,
//     };
//   } catch (error: any) {
//     throw new Error("Error fetching book by ID: " + error.message);
//   }
// };
// export const updateBook = async (id: string, updateData: any) => {
//   try {
//     const book = await Book.findByPk(id);
//     if (!book) {
//       return null;
//     }
//     const updatedBook = await book.update(updateData);
//     return updatedBook;
//   } catch (error) {
//     throw new Error("Error updating book: " + error);
//   }
// };
// export const deleteBook = async (id: string) => {
//   try {
//     const book = await Book.findByPk(id);
//     if (!book) {
//       return null;
//     }
//     await book.destroy();
//     return book;
//   } catch (error) {
//     throw new Error("Error deleting book: " + error);
//   }
// };
//# sourceMappingURL=BooksService.js.map