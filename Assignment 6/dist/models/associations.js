"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Book = exports.User = void 0;
const Books_1 = __importDefault(require("./Books"));
exports.Book = Books_1.default;
const ReviewModel_1 = __importDefault(require("./ReviewModel"));
exports.Review = ReviewModel_1.default;
const UserModel_1 = __importDefault(require("./UserModel"));
exports.User = UserModel_1.default;
// User has many reviews, with a foreign key `userId`
UserModel_1.default.hasMany(ReviewModel_1.default, { foreignKey: "userId", onDelete: "CASCADE" });
ReviewModel_1.default.belongsTo(UserModel_1.default, { foreignKey: "userId" });
// A Book has many reviews, with a foreign key `bookId`
Books_1.default.hasMany(ReviewModel_1.default, { foreignKey: "bookId", onDelete: "CASCADE" });
ReviewModel_1.default.belongsTo(Books_1.default, { foreignKey: "bookId" });
//# sourceMappingURL=associations.js.map