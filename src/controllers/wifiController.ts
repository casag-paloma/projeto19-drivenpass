import { Request, Response } from "express";
import * as wifiService from "../services/wifiService"


export async function createWifi (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const data = req.body

    await wifiService.createWifi(userId, data);
    res.sendStatus(201);
};

export async function getWifi (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;

    const wifis = await wifiService.getWifis(userId);

    res.status(200).send(wifis);
};

export async function getWifiById (req: Request, res: Response) {
    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);

    const wifi = await wifiService.getWifiById(Number(id), userId);

    res.status(200).send(wifi);
};

export async function deleteWifi (req: Request, res: Response) {

    const {userId} = res.locals.tokenData;
    const id = req.params.id;

    if(isNaN(Number(id))) return res.sendStatus(422);

    await wifiService.deleteWifi(Number(id), userId)
    
    res.sendStatus(204);
};