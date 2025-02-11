import { fetchBookFromExternalAPI } from "../utils/FetchExternalBooks";
import { Review, User, Book } from "../models/associations"; // Adjust the path based on your file structure

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
