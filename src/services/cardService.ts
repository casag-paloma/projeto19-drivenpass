import { ICardData } from "../types/RegisterTypes";
import * as cardRepository from "../repositories/cardRepository";
import Cryptr from "cryptr";

const CRYPTR_SECRET_KEY: string = process.env.CRYPTR_SECRET_KEY_CARD ?? ' '
const cryptr = new Cryptr(CRYPTR_SECRET_KEY);


function returnBoolean(string:string){
    if(string === 'true') return true
    else return false
}


export async function createCard(userId:number, data:ICardData){
    console.log(data)
    const card = await cardRepository.getCardByTitle(userId, data.title)

    if(card) throw {type: 'conflict'}

    const encryptSecurityCode = cryptr.encrypt(data.securityCode)
    const encryptPassword = cryptr.encrypt(data.password)

    if(typeof(data.isVirtual) === 'string'){
        data.isVirtual = returnBoolean(data.isVirtual)
    }
    console.log(data.isVirtual);

    
    const cardData = {
        userId,
        title: data.title,
        cardNumber: data.cardNumber,
        cardHolderName: data.cardHolderName,
        securityCode: encryptSecurityCode,
        expirationDate: data.expirationDate,
        password: encryptPassword,
        isVirtual: data.isVirtual,
        type:data.type
    }

    await cardRepository.createCard(cardData);

};
