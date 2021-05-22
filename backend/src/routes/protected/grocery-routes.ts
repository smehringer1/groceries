import express, {Response} from 'express';
import {AuthenticatedRequest, GroceryRaw, GroceryCreationResponse} from '../../utils/interfaces'
import { GroceryItem } from '@prisma/client';
import { createGrocery, deleteGrocery, getGroceries } from '../../services/groceries-service';

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

router.delete('/', async (req : AuthenticatedRequest, res : Response) => {
    let groceryID : number = req.body;

    let deleteSuccess = await deleteGrocery(groceryID);
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