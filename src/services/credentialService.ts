import { ICredentialData, ICredentialType } from "../types/RegisterTypes";
import * as credentialRepository from "../repositories/credentialRepository";
import Cryptr from "cryptr";

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

export async function getCredential() {};

export async function deleteCredential() {};