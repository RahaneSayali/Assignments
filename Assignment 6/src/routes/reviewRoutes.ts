import express from "express";
import { authenticate } from "../middlewares/auth";
import { createReview, getReviews } from "../controller/reviewController";

const reviewRouter = express.Router();

reviewRouter.get("/:bookId/reviews", authenticate, getReviews); //get review by book id
reviewRouter.post("/:bookId/reviews", authenticate, createReview); //create review
reviewRouter.delete("/:bookId/reviews"); //delete review

export { reviewRouter };
