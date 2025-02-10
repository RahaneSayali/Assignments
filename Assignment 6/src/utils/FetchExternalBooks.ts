import axios from "axios";
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const fetchBookFromExternalAPI = async (title: string) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API, {
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
        thumbnail: book.imageLinks?.thumbnail || null,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
};
