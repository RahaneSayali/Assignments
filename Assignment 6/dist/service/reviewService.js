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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByBookId = exports.addReview = void 0;
const FetchExternalBooks_1 = require("../utils/FetchExternalBooks");
const associations_1 = require("../models/associations"); // Adjust the path based on your file structure
const addReview = (bookId, userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("bookId", bookId);
    try {
        const bookExists = yield associations_1.Book.findByPk(bookId);
        if (!bookExists)
            throw new Error("Book not found");
        return yield associations_1.Review.create({
            bookId,
            userId,
            content,
        });
    }
    catch (error) {
        throw new Error("failed to add review : " + error);
    }
});
exports.addReview = addReview;
const getReviewsByBookId = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield associations_1.Review.findAll({
            where: { bookId },
            include: [{ model: associations_1.User, attributes: ["id", "name"] }],
        });
        const book = yield associations_1.Book.findByPk(bookId);
        if (!book)
            throw new Error("Book not found");
        const externalBookData = yield (0, FetchExternalBooks_1.fetchBookFromExternalAPI)(book.title);
        console.log(externalBookData);
        return { reviews, externalBookData };
    }
    catch (error) {
        throw new Error("failed to fetch reviews : " + error);
    }
});
exports.getReviewsByBookId = getReviewsByBookId;
// export const deleteReviewById = async (reviewId: string, userId: string) => {
//   try {
//     // Fetch the review to check if the user is the owner or admin
//     const review = await Review.findByPk(reviewId, {
//       include: [{ model: User, attributes: ["id"] }], // Include the user who created the review
//     });
//     if (!review) {
//       throw new Error("Review not found");
//     }
//     // Check if the user is the author or an admin
//     if (review.userId === userId || (req as any).user.role === "admin") {
//       // Proceed to delete the review
//       await review.destroy();
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     throw new Error("Failed to delete review: " + error);
//   }
// };
//# sourceMappingURL=reviewService.js.map