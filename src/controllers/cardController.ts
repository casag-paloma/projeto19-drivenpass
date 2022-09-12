import { Request, Response } from "express";
import * as cardService from "../services/cardService"


export async function createCard (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const data = req.body
    console.log(userId, data);

    await cardService.createCard(userId, data);
    res.sendStatus(201);
};

export async function getCards (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;

    const cards = await cardService.getCards(userId);
    res.status(200).send(cards);
};

export async function getCardById (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);

    res.status(200).send("Card");
};

export async function deleteCard (req: Request, res: Response) {

    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);
    
    res.sendStatus(204);
};
