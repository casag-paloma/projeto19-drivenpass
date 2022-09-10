import { Router } from "express";
import { createCredential, deleteCredential, getCredential } from "../controllers/credentialController";
import joiValidation from "../middlewares/joiValidationMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post('/credential', joiValidation(credentialSchema), createCredential);
credentialRouter.get('/credential', joiValidation(credentialSchema), getCredential);
credentialRouter.delete('/credential', joiValidation(credentialSchema), deleteCredential);

export default credentialRouter;