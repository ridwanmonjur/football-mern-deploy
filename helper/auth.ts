import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
// import { APP_SECRET } from '../config';

// import { VendorPayload } from '../dto';
// import { AuthPayload } from '../dto/Auth.dto';
import * as dotenv from "dotenv"
// WINDOWS USER
// dotenv.config({ path: __dirname+ "\env\\config.env" })
// UBUNTU USER
dotenv.config({ path: __dirname+ "/env/config.env" })

export const generateSalt = async () => {

    return await bcrypt.genSalt()    
}


export const generatePassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt);

}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {

    return await generatePassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = async (payload: any) => {

   return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '90d'});

}

export const validateSignature  = async(req: Request) => {

    const signature = req.get('Authorization');

    if(signature){
        try {
            const payload = await jwt.verify(signature.split(' ')[1], process.env.TOKEN_SECRET) as AuthPayload; 
            req.user = payload;
            return true;

        } catch(err){
            return false
        } 
    }
    return false
};
