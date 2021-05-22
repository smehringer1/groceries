import { SessionData, ISessionStore } from "../utils/interfaces";

export class SessionStore implements ISessionStore {
    private store: Map<string, SessionData>;
    constructor(){
        this.store = new Map();
    }

    setSessionData(sessionID : string, data : SessionData) : void {
        this.store.set(sessionID, data);
    }

    checkSessionID(requestSessionID : string) : boolean {
        return this.store.has(requestSessionID);
    }

    fetchSessionData(requestSessionID : string) : SessionData | null {
        if (this.checkSessionID(requestSessionID)){
            return this.store.get(requestSessionID)!;
        } 
        return null;
    }

    deleteSessionID(sessionID : string) : boolean {
        return this.store.delete(sessionID);
    }
}