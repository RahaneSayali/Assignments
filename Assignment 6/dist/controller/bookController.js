"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteBookController = exports.updateBookController = exports.addBook = exports.getBookById = exports.getAllBooksController = void 0;
const BooksService_1 = require("../service/BooksService");
const bookService = __importStar(require("../service/BooksService"));
const getAllBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, BooksService_1.getAllBooks)();
        res.json(books); // Return the list of books with the external data
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch all books" });
    }
});
exports.getAllBooksController = getAllBooksController;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    try {
        const book = yield (0, BooksService_1.getBookByIdService)(bookId);
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
exports.getBookById = getBookById;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title) {
            res.status(400).json({ error: "Title is required" });
        }
        const newBook = yield bookService.createBook(title, description);
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create book" });
    }
});
exports.addBook = addBook;
const updateBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, price, publishedYear } = req.body;
        const updatedBook = yield bookService.updateBook(id, {
            title,
            description,
            price,
            publishedYear,
        });
        if (updatedBook) {
            res.status(200).json(updatedBook);
        }
        else {
            res.status(404).json({ error: "Book not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update book" });
    }
});
exports.updateBookController = updateBookController;
const deleteBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedBook = yield bookService.deleteBook(id);
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
        res.status(500).json({ error: "Failed to delete book" });
    }
});
exports.deleteBookController = deleteBookController;
