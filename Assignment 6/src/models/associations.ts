import Book from "./Books";
import Review from "./ReviewModel";
import User from "./UserModel";

// User has many reviews, with a foreign key `userId`
User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

// A Book has many reviews, with a foreign key `bookId`
Book.hasMany(Review, { foreignKey: "bookId", onDelete: "CASCADE" });
Review.belongsTo(Book, { foreignKey: "bookId" });

export { User, Book, Review };
