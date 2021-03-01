
export interface RegistrationCredentials {
    username: string
    password: string
    name: string
}

export interface LoginCredentials {
    username : string
    password : string
}


export interface LoginRegistrationResponse {
    success : boolean
    sessionID? : string
    sessionData? : SessionData
}

export interface SessionData {
    user : User
}

export interface DBResponse {
    success : boolean
    message : string  
}

export interface LoginCheckResponse extends DBResponse {
    sessionData? : SessionData
    hashedPassword? : string
}

export interface RegisterResponse extends DBResponse{
    sessionData? : SessionData
}

export interface GroceryListingResponse extends DBResponse{

}

export interface GroceryListingRaw {
    name : string
    urgency : string
    store : string
}

import { Stores, Urgency, User } from '@prisma/client';

export interface GroceryListing {
    itemName : string
    urgency? : Urgency
    store? : Stores
    createdByID : number
}

import {Request} from 'express';
export interface AuthenticatedRequest extends Request {
    sessionData? : SessionData
}

export interface ISessionStore {
    insertSessionData(sessionID : string, data : SessionData) : void
    checkSessionID(requestSessionID : string) : boolean
    fetchSessionData(requestSessionID : string) : SessionData | null
    deleteSessionID(sessionID : string) : boolean
}