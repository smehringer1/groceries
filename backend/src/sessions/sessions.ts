import { AuthenticatedRequest, SessionData } from "../utils/interfaces";
import {Request, Response, NextFunction} from 'express';
import { v4 as uuidv4} from 'uuid';
import { SessionStore } from "./SessionStore";

const sessionStore = new SessionStore();

export const createSession = (data : SessionData) : string => {
    const uuid = uuidv4();
    console.log(`Creating Session ID: ${uuid}`);
    sessionStore.setSessionData(uuid, data);
    return uuid;
} 

export const setSession = (sessionID : string, data : SessionData) : boolean => {
    if (sessionStore.checkSessionID(sessionID)) {
        console.log(`Setting new session data to: ${data}`);
        sessionStore.setSessionData(sessionID, data);
        return true;
    } else {
        console.log("Cannot set new session data");
        return false;
    }
}

export const removeSession = (req : AuthenticatedRequest) : boolean => {
    const sessionID = extractSessionID(req);
    console.log(`Removing Session ID: ${sessionID}`);
    if (sessionID && sessionStore.deleteSessionID(sessionID!)) {
        return true;
    } else { // SessionID does not exist
        return false;
    }
}

const extractSessionID = (req : Request) : string | null => {
    try {
        if ('authorization' in req.headers){
            const authHeader = req.headers.authorization!;
            const requestSessionID = authHeader.split(' ')[1]; 
            console.log(`Extracting session ID: ${requestSessionID}`);
            return requestSessionID;
        }
    } catch (err) {
        console.log("Error in extracting session ID")
    }
    return null;
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

