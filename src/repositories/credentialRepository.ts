import {ICredentialType} from "../types/RegisterTypes"
import { prisma } from "../config/database";

export async function create(credential: ICredentialType) {

    await prisma.credential.create({data:credential})
};

export async function getCredentialByTitle(userId: number, title:string) {

    const credential = await prisma.credential.findFirst({where:{
        userId, 
        title
    }});

    return credential;
};

export async function getCredentialsByUserId(userId: number) {

    const credentials = await prisma.credential.findMany({where:{userId}});
    return credentials;
};

export async function getCredentialsById( id: number) {

    const credential = await prisma.credential.findFirst({where:{id}});
    return credential;
};

export async function getCredentialsByIdAndUserId(id:number,userId: number) {

    const credential = await prisma.credential.findFirst({where:{
        id,
        userId
    }});

    return credential;
};

export async function deleteCredential(id:number) {

    await prisma.credential.delete({where:{id}});
};





