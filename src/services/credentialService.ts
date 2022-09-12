import { ICredentialData } from "../types/RegisterTypes";
import * as credentialRepository from "../repositories/credentialRepository";
import Cryptr from "cryptr";
import { Credential } from "@prisma/client";

const CRYPTR_SECRET_KEY: string = process.env.CRYPTR_SECRET_KEY ?? ' '
const cryptr = new Cryptr(CRYPTR_SECRET_KEY);


export async function createCredential(userId:number, data:ICredentialData){

    const credential = await credentialRepository.getCredentialByTitle(userId, data.title)

    if(credential) throw {type: 'conflict'}

    const encryptPassword = cryptr.encrypt(data.password)

    const credentialData = {
        userId,
        title: data.title,
        url: data.url,
        username: data.username,
        password: encryptPassword
    }

    await credentialRepository.create(credentialData);

};

function decryptPassword(data: Credential){

    const decryptedPassword = cryptr.decrypt(data.password);
    return {
        id: data.id,
        title: data.title,
        url: data.url,
        username: data.username,
        password: decryptedPassword
    }
}

export async function getCredential(userId:number) {
    const result  = await credentialRepository.getCredentialsByUserId(userId);
    const credentials = result.map((data: Credential) => decryptPassword(data))

    return credentials;
};

export async function getCredentialById(id:number, userId:number) {

    const credentialId = await credentialRepository.getCredentialsById(id)
    if(!credentialId) throw {type: "not_found"};

    const credential = await credentialRepository.getCredentialsByIdAndUserId(id, userId);
    if(!credential) throw {type: "unauthorized"};

    const result = decryptPassword(credential);

    return result;    
};

export async function deleteCredential(id:number, userId:number) {

    const credentialId = await credentialRepository.getCredentialsById(id)
    if(!credentialId) throw {type: "not_found"};

    const credential = await credentialRepository.getCredentialsByIdAndUserId(id, userId);
    if(!credential) throw {type: "unauthorized"};

    await credentialRepository.deleteCredential(id);
};