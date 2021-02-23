
export interface NewAccountCredentials {
    username: string
    password: string
    name: string
}

export interface LoginCredentials {
    username : string
    password : string
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

// TODO: Clearly define AuthenticatedRequest interface/type
import {Request} from 'express';
export interface AuthenticatedRequest extends Request {
    sessionData? : SessionData
}
