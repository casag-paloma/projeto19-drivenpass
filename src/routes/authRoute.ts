import { Router } from "express";
import { createUser, login } from "../controllers/authController";
import joiValidation from "../middlewares/joiValidationMiddleware";
import { authSchema } from "../schemas/authSchema";
const authRouter = Router();

//create a new user
authRouter.post('/signup', joiValidation(authSchema), createUser);

//signs user in 
authRouter.post('/signin', joiValidation(authSchema), login);


export default authRouter;