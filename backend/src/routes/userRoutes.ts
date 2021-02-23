import express, {Request, Response} from 'express';
import {NewAccountCredentials, RegisterResponse} from '../utils/interfaces';
import {getAllUsers,createNewAccount} from '../db/userDBActions'

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    let users = await getAllUsers();
    console.log(users);
    res.json(users);
})

module.exports = router;