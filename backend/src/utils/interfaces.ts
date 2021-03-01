// Input data format

export interface RegistrationCredentials {
    username: string
    password: string
    name: string
}

export interface LoginCredentials {
    username : string
    password : string
}

export interface GroceryRaw {
    name : string
    urgency : string
    store : string
}

import { GroceryItem, Stores, Urgency, User } from '@prisma/client';
export interface NewGrocery {
    itemName : string
    urgency? : Urgency
    store? : Stores
    createdByID : number
}

// Service responses

export interface LoginRegistrationResponse {
    success : boolean
    sessionID? : string
    sessionData? : SessionData
}

export interface GroceryCreationResponse {
    success : boolean
    groceryItem? : GroceryItem 
}

export interface SessionData {
    user : User
}

// DB responses

export interface DB_Response {
    success : boolean
    message : string  
}

export interface DB_LoginCheckResponse extends DB_Response {
    sessionData? : SessionData
    hashedPassword? : string
}

export interface DB_RegisterResponse extends DB_Response{
    sessionData? : SessionData
}

export interface DB_GroceryResponse extends DB_Response{
    groceryItem? : GroceryItem
}

// Data form

import {Request} from 'express';
export interface AuthenticatedRequest extends Request {
    sessionData? : SessionData
}

// Class interfaces

export interface ISessionStore {
    insertSessionData(sessionID : string, data : SessionData) : void
    checkSessionID(requestSessionID : string) : boolean
    fetchSessionData(requestSessionID : string) : SessionData | null
    deleteSessionID(sessionID : string) : boolean
}