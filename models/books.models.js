import mongoose, {Schema} from "mongoose";

const bookSchema = new Schema({
    bookName : {
        type : String,
        required : true,
        unique : true,
        
    },
    authorName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    isbn : {
        type : String,
        required : true,
        unique : true,
    },
    reviewId : [{
        type : Schema.Types.ObjectId,
        ref : "Reviews"
    }]
});

const Books = mongoose.model("Book",bookSchema,"books");

export { Books };