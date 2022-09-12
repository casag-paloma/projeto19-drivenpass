import { Wifi } from "@prisma/client";
import { IWifiData } from "../types/RegisterTypes";
import * as wifiRepository from "../repositories/wifiRepository";
import Cryptr from "cryptr";

const CRYPTR_SECRET_KEY: string = process.env.CRYPTR_SECRET_KEY_WIFI ?? ' '
const cryptr = new Cryptr(CRYPTR_SECRET_KEY);


export async function createWifi(userId:number, data:IWifiData){

    const encryptPassword = cryptr.encrypt(data.password)

    const wifiData = {
        userId,
        title: data.title,
        name: data.name,
        password: encryptPassword
    }

    await wifiRepository.createWifi(wifiData);

};

function decryptPassword(data: Wifi){

    const decryptedPassword = cryptr.decrypt(data.password);

    return {
        id: data.id,
        title: data.title,
        name: data.name,
        password: decryptedPassword
    }
}

export async function getWifis(userId:number) {
    const result = await wifiRepository.getWifisByUserId(userId);
    const wifis = result.map((data: Wifi) => decryptPassword(data))

    return wifis;
};

export async function getWifiById(id:number, userId:number) {

    const wifiId = await wifiRepository.getwWifiById(id)
    if(!wifiId) throw {type: "not_found"};

    const wifi = await wifiRepository.getWifiByIdAndUserId(id, userId);
    if(!wifi) throw {type: "unauthorized"};

    const result = decryptPassword(wifi);

    return result;    
};

export async function deleteWifi(id:number, userId:number) {

    const wifiId = await wifiRepository.getwWifiById(id)
    if(!wifiId) throw {type: "not_found"};

    const wifi = await wifiRepository.getWifiByIdAndUserId(id, userId);
    if(!wifi) throw {type: "unauthorized"};

    await wifiRepository.deleteWifi(id);
};