import { Request, Response } from "express";
import * as reviewService from "../service/reviewService";
import Book from "../models/Books";
import { fetchBookFromExternalAPI } from "../utils/FetchExternalBooks";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { content } = req.body;
    const userId = (req as any).user.id;
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

    const review = await reviewService.addReview(bookId, userId, content);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { reviews, externalBookData } =
      await reviewService.getReviewsByBookId(bookId);

    res.json({
      reviews,
      externalBookData,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
