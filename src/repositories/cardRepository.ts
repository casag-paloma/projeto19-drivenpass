import {ICardType} from "../types/RegisterTypes"
import { prisma } from "../config/database";

export async function createCard(card: ICardType) {

    await prisma.card.create({data:card})

};

export async function getCardByTitle(userId: number, title:string) {

    const card = await prisma.card.findFirst({where:{
        userId, 
        title
    }});

    return card;
};

export async function getCardsByUserId(userId: number) {

    const cards = await prisma.card.findMany({where:{userId}});

    return cards;
};

export async function getCardById( id: number) {

    const card = await prisma.card.findFirst({where:{id}});
    return card;
};

export async function getCardByIdAndUserId(id:number,userId: number) {
    console.log(id, userId)

    const card = await prisma.card.findFirst({where:{
        id,
        userId
    }});
    console.log(card)

    return card;
};

export async function deleteCard(id:number) {

    await prisma.card.delete({where:{id}});
};





