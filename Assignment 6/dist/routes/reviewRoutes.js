"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const reviewController_1 = require("../controller/reviewController");
const reviewRouter = express_1.default.Router();
exports.reviewRouter = reviewRouter;
reviewRouter.get("/:bookId/reviews", auth_1.authenticate, reviewController_1.getReviews); //get review by book id
reviewRouter.post("/:bookId/reviews", auth_1.authenticate, reviewController_1.createReview); //create review
reviewRouter.delete("/:bookId/reviews"); //delete review
//# sourceMappingURL=reviewRoutes.js.map