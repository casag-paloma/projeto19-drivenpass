import { Request, Response } from "express";
import * as credentialService from "../services/credentialService";


export async function createCredential (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const data = req.body

    await credentialService.createCredential(userId, data);
    res.sendStatus(201);
};

export async function getCredential (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;

    const credentials = await credentialService.getCredential(userId)
    res.status(200).send(credentials);
};

export async function getCredentialById (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);
    
    const credential = await credentialService.getCredentialById(Number(id), userId);

    res.status(200).send(credential);
};

export async function deleteCredential (req: Request, res: Response) {

    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);
    
    await credentialService.deleteCredential(Number(id), userId);

    res.sendStatus(204);
};