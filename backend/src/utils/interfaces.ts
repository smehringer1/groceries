
export interface NewAccountCredentials {
    username: string
    password: string
    name: string
}

export interface LoginCredentials {
    username : string
    password : string
}



export interface DBResponse {
    success : boolean
    message : string  
}

export interface LoginCheckResponse extends DBResponse {
    userid? : number
    hashedPassword? : string
}

export interface RegisterResponse extends DBResponse{
    userid? : number // userid does not exist if success === false
}

export interface GroceryListingResponse extends DBResponse{

}

export interface GroceryListingRaw {
    name : string
    urgency : string
    store : string
}

import { Stores, Urgency } from '@prisma/client';

export interface GroceryListing {
    itemName : string
    urgency? : Urgency
    store? : Stores
    createdByID : number
}

import {Request} from 'express';
export interface AuthenticatedRequest extends Request {
    userid? : number
}
