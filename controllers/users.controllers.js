import { Users } from "../models/users.models";
import { signUpValidation } from "../middlewares/signUpValidation.middlewares";

const registerUser = async(req,res,next) => {
    const {userName , fullName , email , password} = req.body;
    const isValidInput = signUpValidation.safeParse({
        userName,fullName,email,password
    });
    if(!isValidInput.success){
        throw new ApiError(401,isValidInput.error,"Please enter valid input");
    }

    const createUser = 
}

export {registerUser};