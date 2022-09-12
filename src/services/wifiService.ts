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

function decryptPassword(data: IWifiData){
    console.log(CRYPTR_SECRET_KEY);

    const decryptedPassword = cryptr.decrypt(data.password);

    console.log(decryptedPassword);
    return {
        title: data.title,
        name: data.name,
        password: decryptedPassword
    }
}

export async function getWifis(userId:number) {
    const result = await wifiRepository.getWifisByUserId(userId);
    console.log(result);
    const wifis = result.map((data: IWifiData) => decryptPassword(data))

    return wifis;
};
