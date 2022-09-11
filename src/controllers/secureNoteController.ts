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

    const secureNotes = await secureNoteService.getSecureNotes(userId)

    res.status(200).send(secureNotes);
};

export async function getSecureNoteById (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);
    

    const secureNote = await secureNoteService.getSecureNoteById(Number(id), userId)
    res.status(200).send(secureNote);
};

export async function deleteSecureNote (req: Request, res: Response) {

    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);

    await secureNoteService.deleteSecureNote(Number(id), userId)
    
    res.sendStatus(204);
};