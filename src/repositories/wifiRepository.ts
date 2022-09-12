import {IWifiType} from "../types/RegisterTypes"
import { prisma } from "../config/database";

export async function createWifi(wifi: IWifiType) {

    await prisma.wifi.create({data:wifi})

};

export async function getWifisByUserId(userId: number) {

    const wifis = await prisma.wifi.findMany({where:{userId}});
    return wifis;
};

export async function getwWifiById( id: number) {

    const wifi = await prisma.wifi.findFirst({where:{id}});
    return wifi;
};

export async function getWifiByIdAndUserId(id:number,userId: number) {
    console.log(id, userId)

    const wifi = await prisma.wifi.findFirst({where:{
        id,
        userId
    }});

    return wifi;
};

export async function deleteWifi(id:number) {

   await prisma.wifi.delete({where:{id}});
};


