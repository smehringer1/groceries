import express, {Request, Response} from 'express';
import {LoginCheckResponse, LoginCredentials, NewAccountCredentials, RegisterResponse} from '../utils/interfaces'
import {getUserForLogin, createNewAccountAndUser} from '../db/userDBActions'
import {compareHashes} from '../utils/hash'
import {createToken} from '../utils/authFunctions'

const router = express.Router();

// TODO: Convert from JWT to normal sessions using Redis and implement logout

router.post('/login', async (req: Request, res: Response) => {
    const loginCredentials : LoginCredentials = req.body; // Submitted login credentials
    const queriedUser : LoginCheckResponse = await getUserForLogin(loginCredentials); // Query using login username
    if (queriedUser.success && await compareHashes(queriedUser.hashedPassword!, loginCredentials.password)){ // Username is valid
            const accessToken = createToken(queriedUser.userid!);
            res.cookie('jwt', accessToken, {httpOnly : true})
            res.send('Success')
    } else {
        res.send('Failure')
    }  
})

router.post('/register', async (req: Request, res: Response) => {
    let account : NewAccountCredentials = req.body;
    let dbResponse : RegisterResponse = await createNewAccountAndUser(account);
    if (dbResponse.success){
        const createdUserID = dbResponse.userid;
        const accessToken = createToken(createdUserID!);
        res.cookie('jwt', accessToken, {httpOnly : true})
    }
    res.send(dbResponse.message);
});

module.exports = router;