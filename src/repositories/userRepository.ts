import { IUserData } from "../types/UserTypes";
import { prisma } from "../config/database";

export async function create(user:IUserData) {

    await prisma.user.create({data:user})

};

export async function getUserByEmail(email:string) {

    const user = await prisma.user.findFirst({where: {email}})

    return user;
};

