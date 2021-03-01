import { GroceryItem, Stores, Urgency } from "@prisma/client";
import { createGroceryListing, getGroceryListings } from "../db/groceries";
import { GroceryCreationResponse, NewGrocery, GroceryRaw, DB_GroceryResponse } from "../utils/interfaces";

export const getGroceries = async () : Promise<GroceryItem[]> => {
    return await getGroceryListings();
} 

export const createGrocery = async (requestBodyData : GroceryRaw, userID : number) : Promise<GroceryCreationResponse> => {
    let groceryListing : NewGrocery = {
        itemName : requestBodyData.name,
        urgency : (<any>Urgency)[requestBodyData.urgency],
        store : (<any>Stores)[requestBodyData.store],
        createdByID : userID
    }
    const listingResponse : DB_GroceryResponse = await createGroceryListing(groceryListing);
    if (listingResponse.success) {
        return {success : true, groceryItem : listingResponse.groceryItem!}
    } else {
        return {success : false};
    }
}