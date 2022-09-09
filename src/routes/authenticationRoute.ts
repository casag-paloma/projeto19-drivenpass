import { Router } from "express";
import joiValidation from "../middlewares/joiValidationMiddleware";
import { authSchema } from "../schemas/authSchema";
const authRouter = Router();

//create a new user
authRouter.post('/signUp', joiValidation(authSchema));

//signs user in 
authRouter.post('/signIn', joiValidation(authSchema));


export default authRouter;