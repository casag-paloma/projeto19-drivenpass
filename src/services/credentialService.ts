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

function decryptPassword(data: ICredentialData){
    console.log(CRYPTR_SECRET_KEY);

    const decryptedPassword = cryptr.decrypt(data.password);
    
    console.log(decryptedPassword);
    return {
        title: data.title,
        url: data.url,
        username: data.username,
        password: decryptedPassword
    }
}
export async function getCredential(userId:number) {
    const result = await credentialRepository.getCredentialsByUserId(userId);
    console.log(result);
    const credentials = result.map((data: ICredentialData) => decryptPassword(data))

    return credentials;
};


export async function getCredentialById() {};

export async function deleteCredential() {};