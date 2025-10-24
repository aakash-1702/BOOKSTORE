import { Router } from "express";
const router = Router();
import {
  getAllBooks,
  getISBNBook,
  getBooksbyAuthor,
  getBooksbyTitle,  
  
} from "./controllers/books.controllers.js";
import { getBookReview , addReview , modifyReview , deleteReview} from "./controllers/reviews.controllers.js";
import { registerUser , logInUser } from "./controllers/users.controllers.js";

// ---------- task  to get all the books
router.route("books").get(getAllBooks);
router.route("books/:id").get(getISBNBook);
router.route("books/:author").get(getBooksbyAuthor);
router.route("books/:title").get(getBooksbyTitle);
router.route("books/:id").get(getBookReview);

// ---------------------------- routes for performing operations on users
router.route("/users/register").post(registerUser);
router.route("/users/logIn").post(logInUser);

//  routes for adding the reviews and updating the existing review , only for loggedIn users
router.route("/users/review/add/:id").post(addReview);
router.route("/users/review/modify/:id").patch(modifyReview);

router.route("/users/review/delete/:id").delete(deleteReview);

export { router };
