"use strict";
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
exports.deleteBook = exports.updateBook = exports.getBookByIdService = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const Books_1 = __importDefault(require("../models/Books"));
const FetchExternalBooks_1 = require("../utils/FetchExternalBooks");
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Books_1.default.findAll(); //db books
        const enrichedBooks = yield Promise.all(books.map((book) => __awaiter(void 0, void 0, void 0, function* () {
            const externalBookData = yield (0, FetchExternalBooks_1.fetchBookFromExternalAPI)(book.title);
            const bookLink = `http://localhost:5000/Books/${book.id}`;
            return Object.assign(Object.assign({}, book.toJSON()), { externalData: externalBookData, link: bookLink });
        })));
        return enrichedBooks;
    }
    catch (error) {
        throw new Error("Failed to fetch all books: " + error.message);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Books_1.default.findByPk(id);
});
exports.getBookById = getBookById;
const createBook = (title, author, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch additional data from external API
        const externalBookData = yield (0, FetchExternalBooks_1.fetchBookFromExternalAPI)(title);
        const bookCode = `BOOK-${Math.floor(1000 + Math.random() * 9000)}`;
        const publishedYear = (externalBookData === null || externalBookData === void 0 ? void 0 : externalBookData.publishedDate)
            ? parseInt(externalBookData.publishedDate.split("-")[0]) ||
                new Date().getFullYear()
            : new Date().getFullYear();
        const newBook = yield Books_1.default.create({
            bookCode,
            title,
            author,
            description: description ||
                (externalBookData === null || externalBookData === void 0 ? void 0 : externalBookData.description) ||
                "No description available",
            publishedYear,
            price: 0, //default
            externalId: externalBookData === null || externalBookData === void 0 ? void 0 : externalBookData.id,
        });
        return newBook;
    }
    catch (error) {
        throw new Error(`Failed to create book: ${error.message}`);
    }
});
exports.createBook = createBook;
const getBookByIdService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Books_1.default.findByPk(bookId);
        if (!book) {
            return null;
        }
        const externalBookData = yield (0, FetchExternalBooks_1.fetchBookFromExternalAPI)(book.title);
        return Object.assign(Object.assign({}, book.toJSON()), { externalData: externalBookData });
    }
    catch (error) {
        throw new Error("Error fetching book by ID: " + error.message);
    }
});
exports.getBookByIdService = getBookByIdService;
const updateBook = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Books_1.default.findByPk(id);
        if (!book) {
            return null;
        }
        const updatedBook = yield book.update(updateData);
        return updatedBook;
    }
    catch (error) {
        throw new Error("Error updating book: " + error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Books_1.default.findByPk(id);
        if (!book) {
            return null;
        }
        yield book.destroy();
        return book;
    }
    catch (error) {
        throw new Error("Error deleting book: " + error);
    }
});
exports.deleteBook = deleteBook;
