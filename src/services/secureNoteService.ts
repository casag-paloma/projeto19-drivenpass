import { ISecureNoteData } from "../types/RegisterTypes";
import * as secureNoteRepository from "../repositories/secureNoteRepository";

export async function createSecureNote(userId:number, data:ISecureNoteData){

    const secureNote = await secureNoteRepository.geteSecureNoteByTitle(userId, data.title)

    if(secureNote) throw {type: 'conflict', message: 'this title is already in use'}

    const secureNoteData = {
        userId,
        ...data}

    await secureNoteRepository.create(secureNoteData);

};

export async function getSecureNotes(userId:number) {
    const secureNotes = await secureNoteRepository.getSecureNotesByUserId(userId);
    return secureNotes;
};

export async function getSecureNoteById(id:number, userId:number) {

    const secureNoteId = await secureNoteRepository.getSecureNoteById(id)
    if(!secureNoteId) throw {type: "not_found"};

    const secureNote = await secureNoteRepository.getSecureNoteByIdAndUserId(id, userId);
    if(!secureNote) throw {type: "unauthorized"};

    return secureNote;    
};

export async function deleteSecureNote(id:number, userId:number) {

    const secureNoteId = await secureNoteRepository.getSecureNoteById(id)
    if(!secureNoteId) throw {type: "not_found"};

    const secureNote = await secureNoteRepository.getSecureNoteByIdAndUserId(id, userId);
    if(!secureNote) throw {type: "unauthorized"};

    await secureNoteRepository.deleteSecureNote(id);
};

