import {ISecureNoteType} from "../types/RegisterTypes"
import { prisma } from "../config/database";

export async function create(secureNote: ISecureNoteType) {

    await prisma.secureNote.create({data:secureNote})

};

export async function geteSecureNoteByTitle(userId: number, title:string) {

    const secureNote = await prisma.secureNote.findFirst({where:{
        userId, 
        title
    }});

    return secureNote;
};

export async function getSecureNotesByUserId(userId: number) {

    const secureNotes = await prisma.secureNote.findMany({where:{userId}});

    return secureNotes;
};

export async function getSecureNoteById( id: number) {

    const secureNote = await prisma.secureNote.findFirst({where:{id}});
    return secureNote;
};

export async function getSecureNoteByIdAndUserId(id:number,userId: number) {
    
    const secureNote = await prisma.secureNote.findFirst({where:{
        id,
        userId
    }});
    return secureNote;
};

export async function deleteSecureNote(id:number) {

    await prisma.secureNote.delete({where:{ id}});

};





