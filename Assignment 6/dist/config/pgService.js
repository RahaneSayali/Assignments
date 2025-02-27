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
exports.PgService = void 0;
const Books_1 = __importDefault(require("../models/Books"));
class PgService {
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Books_1.default.findAll();
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Books_1.default.findByPk(id);
        });
    }
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Books_1.default.create(bookData);
        });
    }
    updateBook(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Books_1.default.findByPk(id);
            if (!book)
                return null;
            return yield book.update(updateData);
        });
    }
    archiveBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Books_1.default.findByPk(id);
            if (!book)
                return null;
            return yield book.update({ isActive: false, archived: true });
        });
    }
    deleteBook(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingBook = yield Books_1.default.findByPk(id);
            if (!existingBook) {
                console.error("Book not found with id:", id);
                return null;
            }
            return yield (existingBook === null || existingBook === void 0 ? void 0 : existingBook.update(updateData));
        });
    }
}
exports.PgService = PgService;
//# sourceMappingURL=pgService.js.map