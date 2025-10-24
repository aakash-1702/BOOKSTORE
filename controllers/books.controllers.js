import { Books } from "../models/books.models.js";
import { Reviews } from "../models/review.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const getAllBooks = async () => {
  const allBooks = await Books.find({});
  if (!allBooks)
    throw new ApiError(400, "Unable to fetch all the books at the time");
  res.status(200).json( new ApiResponse(200,allBooks,"displaying all the books"));
};


const getISBNBook = async(req,res,next) => {
    const isbnId = req.params.id;
    const bookExists = await Books.findOne({
        isbn : isbnId
    });
    if(!bookExists) throw new ApiError(401,"There was an error while fetching the books with this ISBN id");

    return res.status(200)
              .json(new ApiResponse(200,bookExists,"Books with the given ISBN id fetched successfully"));

}

const getBooksbyAuthor = async(req,res,next) => {
    const authorName = req.params.author;
    if(!authorName) throw new ApiError(401,"Please provide the author name");

    const booksAvailable = await Books.findOne({
        author : authorName
    });

    if(!booksAvailable) throw new ApiError("401","Unable to find the books at the moment");

    return res
              .status(200)
              .json(new ApiResponse(200,booksAvailable,`Books by ${authorName} has been displayed`));
}

const getBooksbyTitle = async (req,res) => {
    const title = req.params.title;
    if(!title) throw new ApiError(401,"Please enter the title of the book");

    try {
        const booksByTitle = await Books.find({title : /title/i});
        if(!booksByTitle) return res
                                    .status(200)
                                    .json(new ApiResponse(200,null,`there does not exists any such book with title ${title}`));       
    } catch (error) {
        console.log("Unable to fetch books with tile",error);
        throw new ApiError(401,"Unable to fetch books with title");      
    }
}







export {getAllBooks , getISBNBook , getBooksbyAuthor , getBooksbyTitle};


