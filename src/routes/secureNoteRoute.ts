import { Router } from "express";
import joiValidation from "../middlewares/joiValidationMiddleware";
import { authUser } from "../middlewares/authMiddleware";
import { secureNoteSchema } from "../schemas/secureNoteSchema";
import { createSecureNote, deleteSecureNote, getSecureNote, getSecureNoteById } from "../controllers/secureNoteController";

const secureNoteRouter = Router();

secureNoteRouter.post('/securenote', authUser, joiValidation(secureNoteSchema), createSecureNote);

secureNoteRouter.get('/securenote', authUser, getSecureNote);
secureNoteRouter.get('/securenote/:id', authUser, getSecureNoteById);

secureNoteRouter.delete('/securenote/:id', authUser, deleteSecureNote);

export default secureNoteRouter;