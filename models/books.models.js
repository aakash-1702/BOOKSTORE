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
        type : Number,
        required : true,
        unique : true,
    },
    review : [{
        Users : {
            type : Schema.Types.ObjectId,
            path : "Users"
        }
    }] 
});

const Books = mongoose.model("Book",bookSchema,"books");

export { Books };