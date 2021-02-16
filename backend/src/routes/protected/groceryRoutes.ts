import express, {Request, Response} from 'express';
import {AuthenticatedRequest, GroceryListing, GroceryListingRaw, GroceryListingResponse} from '../../utils/interfaces'
import {createGroceryListing} from '../../db/groceryDBActions';
import { Stores, Urgency } from '@prisma/client';

const router = express.Router();

router.post('/create', async (req : AuthenticatedRequest, res : Response) => {
    let requestBodyData : GroceryListingRaw = req.body;  

    let groceryListing : GroceryListing = {
        itemName : requestBodyData.name,
        urgency : (<any>Urgency)[requestBodyData.urgency],
        store : (<any>Stores)[requestBodyData.store],
        createdByID : req.userid! 
    }
    const listingResponse : GroceryListingResponse = await createGroceryListing(groceryListing);
    if (listingResponse.success){
        res.send("Success");
    } else {
        res.send('Failure');
    }
})


module.exports = router;