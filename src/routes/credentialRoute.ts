import { Router } from "express";
import { createCredential, deleteCredential, getCredential } from "../controllers/credentialController";
import joiValidation from "../middlewares/joiValidationMiddleware";
import { authUser } from "../middlewares/authMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post('/credential', authUser, joiValidation(credentialSchema), createCredential);
credentialRouter.get('/credential', authUser, joiValidation(credentialSchema), getCredential);
credentialRouter.delete('/credential', authUser, joiValidation(credentialSchema), deleteCredential);

export default credentialRouter;