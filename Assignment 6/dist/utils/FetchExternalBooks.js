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
exports.fetchBookFromExternalAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";
const fetchBookFromExternalAPI = (title) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.get(GOOGLE_BOOKS_API, {
            params: {
                q: title, // Search by book title
                maxResults: 1,
            },
        });
        console.log("External API Response:", response.data);
        if (response.data.items && response.data.items.length > 0) {
            const book = response.data.items[0].volumeInfo;
            return {
                id: book.id,
                title: book.title,
                authors: book.authors || ["Unknown"],
                description: book.description || "No description available",
                publishedDate: book.publishedDate || "Unknown",
                thumbnail: ((_a = book.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail) || null,
                averageRating: book.averageRating || "No rating available",
                ratingsCount: book.ratingsCount || 0,
            };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error("Error fetching book details:", error);
        return null;
    }
});
exports.fetchBookFromExternalAPI = fetchBookFromExternalAPI;
//# sourceMappingURL=FetchExternalBooks.js.map