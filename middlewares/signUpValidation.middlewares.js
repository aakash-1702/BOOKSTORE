    import * as z from "zod";

    const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/
    );

    const signUpValidation = z.object({
        userName : z.string().min(5).max(30).trim(),
        fullName : z.string().trim(),
        email : z.email(),
        password : z.string().min(8).max(50).regex(passwordValidation,{message : "Your password is not valid"})
    });

    export {signUpValidation};