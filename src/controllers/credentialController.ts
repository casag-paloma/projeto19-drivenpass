import { Request, Response } from "express";
import * as credentialService from "../services/credentialService";


export async function createCredential (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const data = req.body
    console.log(userId, data);

    await credentialService.createCredential(userId, data);
    res.sendStatus(201);
};

export async function getCredential (req: Request, res: Response) {


    res.sendStatus(200);
};

export async function deleteCredential (req: Request, res: Response) {
    res.sendStatus(204);
};