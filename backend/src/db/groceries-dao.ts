import { GroceryItem } from '@prisma/client';
import { NewGrocery, DB_GroceryResponse } from '../utils/interfaces';

import prisma from '../utils/prisma-client';

export namespace GroceriesDAO {
    
    const getGroceryListings = async () : Promise<GroceryItem[]> => {
        return await prisma.groceryItem.findMany();
    }
    
    const createGroceryListing = async (groceryListing : NewGrocery) : Promise<DB_GroceryResponse> => {
        let createdListingData : NewGrocery = $.extend({ itemName : groceryListing.itemName, createdByID : groceryListing.createdByID }, {
            urgency : groceryListing.urgency,
            store : groceryListing.store
        });
    
        const createdListing = await prisma.groceryItem.create({
            data : createdListingData
        });
        if (!createdListing){
            return {
                success : false,
                message : "Failed to create grocery listing"
            }
        } else {
            return {
                success : true,
                message : "Created grocery listing: ",
                groceryItem : createdListing
            }
        }
    }
    
    const deleteGroceryListing = async (groceryID : number) : Promise<boolean> => {
        try {
            await prisma.groceryItem.delete({
                where : {
                    id : groceryID
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    }
}

