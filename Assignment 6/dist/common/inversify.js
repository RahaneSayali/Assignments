"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const BooksService_1 = require("../service/BooksService");
const bookController_1 = require("../controller/bookController");
const bookRoutes_1 = require("../routes/bookRoutes");
const container = new inversify_1.Container();
exports.container = container;
//bind service
container.bind("IBookService").to(BooksService_1.BookService);
//bind controller
container.bind(bookController_1.BooksController).toSelf();
//bind routes
container.bind(bookRoutes_1.BookRouter).toSelf();
//# sourceMappingURL=inversify.js.map