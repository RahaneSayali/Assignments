import { fetchBookFromExternalAPI } from "../utils/FetchExternalBooks";
import { Review, User, Book } from "../models/associations"; // Adjust the path based on your file structure
import { Op } from "sequelize";
export const addReview = async (
  bookId: string,
  userId: string,
  content: string
) => {
  console.log("bookId", bookId);
  try {
    const bookExists = await Book.findByPk(bookId);
    if (!bookExists) throw new Error("Book not found");

    return await Review.create({
      bookId,
      userId,
      content,
    });
  } catch (error) {
    throw new Error("failed to add review : " + error);
  }
};

export const getReviewsByBookId = async (bookId: string) => {
  try {
    const reviews = await Review.findAll({
      where: { bookId },
      include: [{ model: User, attributes: ["id", "name"] }],
    });
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error("Book not found");
    const externalBookData = await fetchBookFromExternalAPI(book.title);
    console.log(externalBookData);
    return { reviews, externalBookData };
  } catch (error) {
    throw new Error("failed to fetch reviews : " + error);
  }
};

export const deleteReviewById = async (reviewId: string, userId: string) => {
  try {
    // Fetch the review to check if the user is the owner or admin
    const review = await Review.findByPk(reviewId, {
      include: [{ model: User, attributes: ["id"] }], // Include the user who created the review
    });

    if (!review) {
      throw new Error("Review not found");
    }

    // Check if the user is the author or an admin
    if (review.userId === userId || (req as any).user.role === "admin") {
      // Proceed to delete the review
      await review.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Failed to delete review: " + error);
  }
};
