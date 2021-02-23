import { AuthenticatedRequest, SessionData } from "../utils/interfaces";
import {Request, Response, NextFunction} from 'express';
import { v4 as uuidv4} from 'uuid';
import { SessionStore } from "./SessionStore";

let sessionStore = new SessionStore();

const extractSessionID = (req : Request) : string | null => {
    try {
        if ('authorization' in req.headers){
            const authHeader = req.headers.authorization!;
            const requestSessionID = authHeader.split(' ')[1]; 
            return requestSessionID;
        }
    } catch (err) {}
    return null;
}

export const createSession = (data : SessionData) : string => {
    const uuid = uuidv4();
    sessionStore.insertSessionData(uuid, data);
    return uuid;
} 

export const removeSession = (req : AuthenticatedRequest) : boolean => {
    const sessionID = extractSessionID(req);
    if (sessionID && sessionStore.deleteSessionID(sessionID!)) {
        return true;
    } else { // SessionID does not exist
        return false;
    }
}

// Middleware

export const authenticateSession = (req : AuthenticatedRequest, res: Response, next : NextFunction) : void => {
    const requestSessionID = extractSessionID(req);
    if (requestSessionID) {
        const sessionData : SessionData | null = sessionStore.fetchSessionData(requestSessionID);
        if (sessionData) {
            req.sessionData = sessionData;
            return next();
        }
    }
    res.status(401).json({error: "Access denied"});
}

export const ensureUnauthenticated = (req : Request, res : Response, next : NextFunction) : void => {
    if (extractSessionID(req)) {
        res.send('Already logged in');
    } else {
        next();
    }
}