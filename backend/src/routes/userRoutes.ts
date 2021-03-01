import express, {Request, Response} from 'express';
import {RegistrationCredentials, RegisterResponse} from '../utils/interfaces';
import {getAllUsers,createNewAccount} from '../db/user'

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    let users = await getAllUsers();
    console.log(users);
    res.json(users);
})

module.exports = router;