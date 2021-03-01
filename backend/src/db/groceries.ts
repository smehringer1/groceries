import {PrismaClient } from '@prisma/client';
import { GroceryListing, GroceryListingResponse } from '../utils/interfaces';

const prisma = new PrismaClient();

export const createGroceryListing = async (groceryListing : GroceryListing) : Promise<GroceryListingResponse> => {
    let createdListingData : GroceryListing = $.extend({ itemName : groceryListing.itemName, createdByID : groceryListing.createdByID }, {
        urgency : groceryListing.urgency,
        store : groceryListing.store
    })

    const createdListing = await prisma.groceryItem.create({
        data : createdListingData
    })
    if (!createdListing){
        return {
            success : false,
            message : "Failed to create grocery listing"
        }
    } else {
        return {
            success : true,
            message : "Created grocery listing: "
        }
    }
}