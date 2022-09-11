import { Router } from "express";
import { createCredential, deleteCredential, getCredential, getCredentialById } from "../controllers/credentialController";
import joiValidation from "../middlewares/joiValidationMiddleware";
import { authUser } from "../middlewares/authMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post('/credential', authUser, joiValidation(credentialSchema), createCredential);

credentialRouter.get('/credential', authUser, getCredential);
credentialRouter.get('/credential/:id', authUser, getCredentialById);

credentialRouter.delete('/credential/:id', authUser, deleteCredential);

export default credentialRouter;