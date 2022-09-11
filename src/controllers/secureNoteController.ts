import { Request, Response } from "express";
import * as secureNoteService from "../services/secureNoteService";


export async function createSecureNote (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const data = req.body
    console.log(userId, data);

    await secureNoteService.createSecureNote(userId, data)
    res.sendStatus(201);
};

export async function getSecureNote (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;

    res.status(200).send('SecureNote');
};

export async function getSecureNoteById (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);
    

    res.status(200).send("SecureNote");
};

export async function deleteSecureNote (req: Request, res: Response) {

    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);
    
    res.sendStatus(204);
};