import { IUserData } from "../types/UserTypes";
import * as userRepository from '../repositories/userRepository'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(data:IUserData) {

    const user = await userRepository.getUserByEmail(data.email)

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
    const comparePasswords = bcrypt.compareSync(data.password, user.password);
    if(!comparePasswords){
        throw{ type: 'unauthorized'}
    }

    const tokenData = {userId: user.id}

    const SECRET : string = process.env.TOKEN_SECRET_KEY ?? '';
    const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN ?? '';
    const jwtConfig = {
        expiresIn: EXPIRES_IN
    };
    
    const token = jwt.sign(tokenData, SECRET, jwtConfig);

    return token;
};
