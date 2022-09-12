import {Router} from 'express';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { authUser } from '../middlewares/authMiddleware';
import { cardSchema } from '../schemas/cardSchema';
import { createCard, deleteCard, getCards, getCardById } from '../controllers/cardController';

const cardRouter = Router();

cardRouter.post('/card', authUser, joiValidation(cardSchema), createCard);

cardRouter.get('/card', authUser, getCards);
cardRouter.get('/card/:id', authUser, getCardById);

cardRouter.delete('/card/:id', authUser, deleteCard);

export default cardRouter;

