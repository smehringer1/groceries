import express, {Response} from 'express';
import {AuthenticatedRequest, GroceryRaw, GroceryCreationResponse} from '../../utils/interfaces'
import { GroceryItem } from '@prisma/client';
import { GroceryService } from '../../services/groceries-service';

const router = express.Router();

// Handles CRUD API calls and references GroceryService

router.get('/', async (req : AuthenticatedRequest, res : Response) => {
    // Service call
    let groceries : GroceryItem[] = await GroceryService.getGroceries();
    // Returned JSON
    res.json({
        "success" : true,
        "groceries" : groceries
    })
})

router.post('/', async (req : AuthenticatedRequest, res : Response) => {
    let requestBodyData : GroceryRaw = req.body;  
    // Service call
    let createGroceryResponse : GroceryCreationResponse = await GroceryService.createGrocery(requestBodyData, req.sessionData?.user.id!);
    // Returned JSON depending on response
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

router.delete('/', async (req : AuthenticatedRequest, res : Response) => {
    let groceryID : number = req.body;
    // Service call
    let deleteSuccess = await GroceryService.deleteGrocery(groceryID);
    // Returned JSON depending on response
    if (deleteSuccess) {
        res.json({
            "success" : true
        });
    } else {
        res.json({
            "success" : false
        });
    }
})


module.exports = router;