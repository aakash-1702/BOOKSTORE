import mongoose , {Schema} from "mongoose";
import { Books } from "./books.models.js";
import bcrypt from "bcrypt";

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
    reviewId :[ {
        type : Schema.Types.ObjectId,
        ref : "Reviews"
    }]
});


const Users = mongoose.model("Users",userSchema, "users");

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next(); 
    
    this.password =  await bcrypt.hash(this.password,10);
    console.log("hashedPassword" , this.password);
    next();
});


userSchema.methods.generateAccessToken = async function(){

}





export {Users};