import { Router } from "express";
const router = Router();
import {
  getAllBooks,
  getISBNBook,
  getBooksbyAuthor,
  getBooksbyTitle,
  getBookReview,
} from "./controllers/books.controllers";
import { registerUser } from "./controllers/users.controllers.js";

// ---------- task  to get all the books
router.route("/books").get(getAllBooks);
router.route("books/:id").get(getISBNBook);
router.route("books/:author").get(getBooksbyAuthor);
router.route("books/:title").get(getBooksbyTitle);
router.route("books/:id").get(getBookReview);

// ---------------------------- routes for performing operations on users
router.route("/users/register").post(registerUser);

export { router };
