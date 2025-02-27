import "reflect-metadata";
import { Container } from "inversify";

import { IBookService } from "../interfaces/IBookService";

import { BookService } from "../service/BooksService";

import { BooksController } from "../controller/bookController";
import { BookRouter } from "../routes/bookRoutes";

const container = new Container();

//bind service
container.bind<IBookService>("IBookService").to(BookService);

//bind controller
container.bind<BooksController>(BooksController).toSelf();

//bind routes
container.bind<BookRouter>(BookRouter).toSelf();

export { container };
