import { Users } from "../models/users.models.js";
import { signUpValidation } from "../middlewares/signUpValidation.middlewares.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";


const registerUser = async(req,res,next) => {
    console.log("request reached here");
    const {userName , fullName , email , password} = req.body;
    const isValidInput = signUpValidation.safeParse({
        userName,fullName,email,password
    });
    if(!isValidInput.success){
        throw new ApiError(401,isValidInput.error,"Please enter valid input");
    }

    const createUser = await Users.create({
        userName , fullName , email , password
    });   

    try{
        const savedUser = await createUser.save();
        return res
                 .status(201)
                 .json(new ApiResponse(201,savedUser,"User has been registered"));
    }
    catch(error){
        console.log("An error while registering the user",error);
        throw new ApiError(401,"An error has occured while registering the user");
    }

}


const logInUser = async(req,res,next) => {
    const {userName , password} = req.body;
    const userExists = await Users.findOne({
        userName , password
    });
    if(!userExists) throw new ApiError(401,"Please enter valid credentials");

    const token = jwt.sign({
        _id : userExists._id.toString(),role : userExists.role
    },process.env.JWT_SECRET);
    console.log(token);
    return res
            .status(200)
            .cookie("token",token)
            .json(new ApiResponse(200,token,"user has been logged in and token generated"));  
}



export {registerUser  , logInUser};