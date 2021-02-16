import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import { AuthenticatedRequest } from './interfaces';

// TODO: switch from JWT to standard cookie sessions, Redis session store

export const createToken = (userid : number) => {
    return jwt.sign({ userid : userid }, process.env.TOKEN_SECRET!);
} 

interface DecodedFormat {
    userid : number,
    iat : number
}

export const authenticateToken = (req : AuthenticatedRequest, res: Response, next : NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){ 
        return res.status(401).json({error: "Access denied"});
    }

    const token = authHeader.split(' ')[1]; 
    try {
        let decoded : DecodedFormat = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedFormat;
        req.userid = decoded.userid;
        next();
    } catch (error) {
        return res.status(400).json({error: "Token invalid"});
    }
}