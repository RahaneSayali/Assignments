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
exports.getReviews = exports.createReview = void 0;
const reviewService = __importStar(require("../service/reviewService"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;
        //debugging
        console.log("Received bookId:", bookId);
        if (!bookId) {
            res.status(400).json({ error: "Book ID is required." });
            return;
        }
        if (!userId) {
            res.status(401).json({ error: "unauthorized" });
            return;
        }
        const review = yield reviewService.addReview(bookId, userId, content);
        res.status(201).json(review);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createReview = createReview;
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { reviews, externalBookData } = yield reviewService.getReviewsByBookId(bookId);
        res.json({
            reviews,
            externalBookData,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getReviews = getReviews;
// export const deleteReview = async (req: Request, res: Response) => {
//     try {
//       const { reviewId } = req.params;
//       const userId = (req as any).user.id; // Assuming you set the user ID in the request after authentication
//       // Call the service to delete the review
//       const result = await deleteReviewById(reviewId, userId);
//       if (result) {
//         res.json({ message: "Review deleted successfully" });
//       } else {
//         res.status(403).json({ error: "You are not authorized to delete this review" });
//       }
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   };
//# sourceMappingURL=reviewController.js.map