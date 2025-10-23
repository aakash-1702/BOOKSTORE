import mongoose , {Schema} from "mongoose";
import { Books } from "./books.models";

const userSchema =  new Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "USER"
    },
    reviewHistory : [{
        Books : {
            type : Schema.Types.ObjectId,
            ref : "Books"
        }
    }]

});


const Users = mongoose.model(Users,userSchema, "users");

export {Users};