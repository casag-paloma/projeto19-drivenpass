import { Request, Response } from "express";
import * as cardService from "../services/cardService"


export async function createCard (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const data = req.body
    console.log(userId, data);

    await cardService.createCard(userId, data);
    res.sendStatus(201);
};

export async function getCard (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;

    res.status(200).send("Cards");
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
