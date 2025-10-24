import { Users } from "../models/users.models.js";
import mongoose,{Schema} from "mongoose";
import { Books } from "../models/books.models.js";




const reviewSchema = new Schema({
    bookId : {
        type : Schema.Types.ObjectId,
        ref : "Books",
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "Users",
        required : true
    },
    review : {
        type : String,
        required : true
    }
});

const Reviews = mongoose.model("Review",reviewSchema,"reviews");

export {Reviews};
