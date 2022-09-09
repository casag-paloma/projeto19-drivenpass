import { Request, Response } from "express";
import * as userService from '../services/userService'

export async function createUser(req: Request, res: Response) {
    
    const data = req.body;
    await userService.createUser(data);
    res.sendStatus(201);
    
};
