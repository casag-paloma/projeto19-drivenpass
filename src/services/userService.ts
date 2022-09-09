import { IUserData } from "../types/UserTypes";
import * as userRepository from '../repositories/userRepository'
import bcrypt from 'bcrypt';

export async function createUser(data:IUserData) {

    const user = await userRepository.getUserByEmail(data.email)
    console.log(user)

    if(user) throw{ type: 'conflict'};

    const encryptedPassword = bcrypt.hashSync(data.password, 10);
    const userData = {
        email: data.email,
        password: encryptedPassword
    };
    await userRepository.create(userData);

};

