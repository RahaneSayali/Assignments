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
exports.deleteAuthor = exports.updateAuthor = exports.getAuthor = exports.createAuthor = exports.getAuthors = void 0;
const Author_1 = __importDefault(require("../models/Author"));
const getAuthors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Author_1.default.findAll();
    }
    catch (error) {
        throw new Error("Failed to fetch authors" + error.message);
    }
});
exports.getAuthors = getAuthors;
const createAuthor = (name, bio, birthdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAuthor = yield Author_1.default.create({ name, bio, birthdate });
        return newAuthor;
    }
    catch (error) {
        throw new Error("Failed to create author: " + error);
    }
});
exports.createAuthor = createAuthor;
const getAuthor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield Author_1.default.findByPk(id);
        return author;
    }
    catch (error) {
        throw new Error("Failed to fetch author" + error);
    }
});
exports.getAuthor = getAuthor;
const updateAuthor = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield Author_1.default.findByPk(id);
        if (!author) {
            return null;
        }
        const updatedAuthor = yield author.update(updateData);
        return updatedAuthor;
    }
    catch (error) {
        throw new Error("Failed to update author" + error);
    }
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield Author_1.default.findByPk(id);
        if (!author) {
            return null;
        }
        yield author.destroy();
        return author;
    }
    catch (error) {
        throw new Error("Failed to delete author" + error);
    }
});
exports.deleteAuthor = deleteAuthor;
//# sourceMappingURL=authorService.js.map