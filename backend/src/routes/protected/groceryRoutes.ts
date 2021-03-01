import express, {Request, Response} from 'express';
import {AuthenticatedRequest, NewGrocery, GroceryRaw, GroceryCreationResponse} from '../../utils/interfaces'
import {createGroceryListing} from '../../db/groceries';
import { GroceryItem, Stores, Urgency } from '@prisma/client';
import { createGrocery, getGroceries } from '../../services/groceries';

const router = express.Router();

router.get('/', async (req : AuthenticatedRequest, res : Response) => {
    let groceries : GroceryItem[] = await getGroceries();
    res.json({
        "success" : true,
        "groceries" : groceries
    })
})

router.post('/', async (req : AuthenticatedRequest, res : Response) => {
    let requestBodyData : GroceryRaw = req.body;  

    let createGroceryResponse : GroceryCreationResponse = await createGrocery(requestBodyData, req.sessionData?.user.id!);
    if (createGroceryResponse.success){
        res.json({
            "success" : true,
            "grocery" : createGroceryResponse.groceryItem
        });
    } else {
        res.json({
            "success" : false
        });
    }
})


module.exports = router;