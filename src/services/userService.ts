import { IUserData } from "../types/UserTypes";
import * as userRepository from '../repositories/userRepository'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export async function login(data:IUserData) {

    const user = await userRepository.getUserByEmail(data.email)

    if(!user) throw{ type: 'not_found'};
    console.log(data, user)
    const comparePasswords = bcrypt.compareSync(data.password, user.password);
    if(!comparePasswords){
        throw{ type: 'unauthorized'}
    }

    const acess_key = process.env.ACESS_TOKEN_KEY || 'my-secret-acess-key';
    const token = jwt.sign((`${user.id}`), acess_key)
    const result = {
        token,
        id: user.id
    }

    return result;
};
