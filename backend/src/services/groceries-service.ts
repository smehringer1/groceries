import { GroceryItem, Stores, Urgency } from "@prisma/client";
import { GroceriesDAO } from "../db/groceries-dao";
import { GroceryCreationResponse, NewGrocery, GroceryRaw, DB_GroceryResponse } from "../utils/interfaces";

// Provides a service abstraction for actions for grocery listings
// In it's current state it provides same operations as DAO for grocery listings, though handles data form transformations

export namespace GroceryService {

    // get grocery listings

    export const getGroceries = async () : Promise<GroceryItem[]> => {
        return await GroceriesDAO.getGroceryListings();
    } 

    // create grocery listing

    export const createGrocery = async (requestBodyData : GroceryRaw, userID : number) : Promise<GroceryCreationResponse> => {
        // Transform data to NewGrocery type
        let groceryListing : NewGrocery = {
            itemName : requestBodyData.name,
            urgency : (<any>Urgency)[requestBodyData.urgency],
            store : (<any>Stores)[requestBodyData.store],
            createdByID : userID
        }
        const listingResponse : DB_GroceryResponse = await GroceriesDAO.createGroceryListing(groceryListing);
        if (listingResponse.success) {
            return {success : true, groceryItem : listingResponse.groceryItem!}
        } else {
            return {success : false};
        }
    }

    // delete grocery listing

    export const deleteGrocery = async (groceryID : number) : Promise<boolean> => {
        return await GroceriesDAO.deleteGroceryListing(groceryID);
    }

}