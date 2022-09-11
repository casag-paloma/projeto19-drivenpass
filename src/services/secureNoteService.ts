import { ISecureNoteData } from "../types/RegisterTypes";
import * as secureNoteRepository from "../repositories/secureNoteRepository";

export async function createSecureNote(userId:number, data:ISecureNoteData){

    const secureNote = await secureNoteRepository.geteSecureNoteByTitle(userId, data.title)

    if(secureNote) throw {type: 'conflict'}

    const secureNoteData = {
        userId,
        ...data}

    await secureNoteRepository.create(secureNoteData);

};

