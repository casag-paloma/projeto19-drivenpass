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
    const card = await cardRepository.getCardByTitle(userId, data.title)

    if(card) throw {type: 'conflict'}

    const encryptSecurityCode = cryptr.encrypt(data.securityCode)
    const encryptPassword = cryptr.encrypt(data.password)

    if(typeof(data.isVirtual) === 'string'){
        data.isVirtual = returnBoolean(data.isVirtual)
    }
    
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

function decryptSecurityCodeAndPassword(data: ICardData){
    console.log(CRYPTR_SECRET_KEY);

    const decryptedSecurityCode = cryptr.decrypt(data.securityCode);
    const decryptedPassword = cryptr.decrypt(data.password);

    console.log(decryptedPassword);
    return {
        title: data.title,
        cardNumber: data.cardNumber,
        cardHolderName: data.cardHolderName,
        securityCode: decryptedSecurityCode,
        expirationDate: data.expirationDate,
        password: decryptedPassword,
        isVirtual: data.isVirtual,
        type:data.type
    }
}

export async function getCards(userId:number) {
    const result = await cardRepository.getCardsByUserId(userId);
    console.log(result);
    const cards = result.map((data: ICardData) => decryptSecurityCodeAndPassword(data))

    return cards;
};

export async function getCardById(id:number, userId:number) {

    const cardId = await cardRepository.getCardById(id)
    if(!cardId) throw {type: "not_found"};

    const card = await cardRepository.getCardByIdAndUserId(id, userId);
    if(!card) throw {type: "unauthorized"};

    const result = decryptSecurityCodeAndPassword(card);

    return result;    
};

export async function deleteCard(id:number, userId:number) {

    const cardId = await cardRepository.getCardById(id)
    if(!cardId) throw {type: "not_found"};

    const card = await cardRepository.getCardByIdAndUserId(id, userId);
    if(!card) throw {type: "unauthorized"};

    await cardRepository.deleteCard(id);
};

