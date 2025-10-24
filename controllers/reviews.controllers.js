import { Books } from "../models/books.models.js";
import { Users } from "../models/users.models.js";
import { Reviews } from "../models/review.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const getReviews = (bookReview) => {
   return bookReview.map(r => r.review);// return an array of reviews

}


const getBookReview = async (req,res) => {
    const bookId = req.params.id;
    if(!bookId) throw new ApiError(401,"Please select a book for reading its reviews");
    try {
        const bookReview = await Reviews.find({
            bookId,
        });
        if(!bookReview || bookReview.length === 0){
            return res
                     .status(200)
                     .json(new ApiResponse(200,null,"No book review available for this book"));
        }

        const finalAns = getReviews(bookReview);

        return res
                 .status(200)
                 .json(new ApiResponse(200,finalAns,"these are the book reviews for the selected book"));      
        
        
    } catch (error) {
        console.log("Book review fetching failed",error);
        throw new ApiError(401,"Something went wrong while getting the review for the book");       
    }
    
}


const addReview = async (req,res) => {
    const bookId = req.params.id;
    if(!bookId) throw new ApiError(401,"Please provide the BookId");
    const bookExists = await Books.findOne({
        isbn : bookId
    });
    if(!bookExists) throw new ApiError(401,"This book does not exists");
    const token = req.cookies?.token;
    if(!token) throw new ApiError(401,"Please log in first");
    console.log("token has been verified");
    const isValid = jwt.verify(token,process.env.JWT_SECRET);

    if(!isValid) throw new ApiError(401,"Please logIn again");

    const {userReview} = req.body;
    if(!userReview) throw new ApiError(401,"Please provide the review");
    const user = await Users.findOne({
        _id : isValid._id
    });
    if(!user) throw new ApiError(401,"User does not exists"); 
    console.log("user has been verified");


    try {
        const reviewAdded = await Reviews.create({
            bookId : bookExists._id,
            userId : isValid._id,
            review  : userReview
        });
        user.reviewId.push(reviewAdded._id);
        bookExists.reviewId.push(reviewAdded._id);
        await user.save();
        await bookExists.save();
        return res
                 .status(201)
                 .json(new ApiResponse(201,reviewAdded,"Review has been added successfully for the book")); 
    } catch (error) {
        console.log("Error while adding the review",error);
        throw new ApiError(401,"Unable to add the review at this moment");        
    }

}


const modifyReview = async(req,res) => {
    const newReview = req.body;
    if(!newReview || newReview === "") throw new ApiError(401,"Please enter the new Review");
    const bookIsbn = req.params.id;
    if(!bookIsbn) throw new ApiError(401,"Please provide the bookId");
    const token = req.cookies?.token;
    console.log(bookIsbn);
    if(!token) throw new ApiError(401,"Please logIn first");
    const bookId = await Books.findOne({
        isbn : bookIsbn
    });
    if(!bookId) throw new ApiError(401,"Book does not exists");
    const isValid = jwt.verify(token,process.env.JWT_SECRET);
    if(!isValid) throw new ApiError(401,"Please logIn again , your cookie is invalid");

   try {
      const review = await Reviews.findOneAndUpdate({
        bookId : bookId._id,
        userId : isValid._id
      },{
        review : newReview
      });          
      return res
               .status(201)
               .json(new ApiResponse(201,review,"Review has been updated"));
   } catch (error) {
    console.log("An error occured while updating the review",error);
    throw new ApiError(401,"An error occured while updating the review");   
   }

}

const deleteReview = async (req, res, next) => {
  try {
    const { id: isbn } = req.params;
    if (!isbn) throw new ApiError(400, "ISBN is required");

    const token = req.cookies?.token;
    if (!token) throw new ApiError(401, "Unauthorized - No token found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?._id;
    if (!userId) throw new ApiError(401, "Invalid token");

    const book = await Books.findOne({ isbn });
    if (!book) throw new ApiError(404, "Book not found");

    const review = await Reviews.findOne({ book: book._id, user: userId });
    if (!review) throw new ApiError(404, "Review not found");

    const reviewId = review._id;

    await Reviews.findByIdAndDelete(reviewId);
    await Books.findByIdAndUpdate(book._id, { $pull: { reviews: reviewId } });
    await Users.findByIdAndUpdate(userId, { $pull: { reviews: reviewId } });

    return res
      .status(200)
      .json(new ApiResponse(200, "Review deleted successfully"));
  } catch (error) {
    next(error);
  }
};




export {getBookReview , addReview , modifyReview , deleteReview }