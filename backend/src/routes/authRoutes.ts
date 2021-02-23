import express, {Request, Response} from 'express';
import {AuthenticatedRequest, LoginCheckResponse, LoginCredentials, NewAccountCredentials, RegisterResponse} from '../utils/interfaces'
import {getUserForLogin, createNewAccount} from '../db/userDBActions'
import {compareHashes} from '../utils/hash'
import {createSession, ensureUnauthenticated, removeSession} from '../sessions/sessions'

const router = express.Router();


router.post('/login', ensureUnauthenticated, async (req: Request, res: Response) => {
    const loginCredentials : LoginCredentials = req.body; // Submitted login credentials
    const queriedUser : LoginCheckResponse = await getUserForLogin(loginCredentials); // Query using login username
    if (queriedUser.success && await compareHashes(queriedUser.hashedPassword!, loginCredentials.password)){ // Username and password valid
            const sessionData = queriedUser.sessionData!;
            const sessionID = createSession(sessionData);
            res.cookie('sessionID', sessionID, {httpOnly : true})
            res.send('Success');
    } else {
        res.send(queriedUser.message);
    }  
})

router.post('/register', ensureUnauthenticated, async (req: Request, res: Response) => {
    let newAccount : NewAccountCredentials = req.body;
    let registrationResponse : RegisterResponse = await createNewAccount(newAccount);
    if (registrationResponse.success){
        const sessionID = createSession(registrationResponse.sessionData!);
        res.cookie('sessionID', sessionID, {httpOnly : true});
        res.send('Success');
    } else {
        res.send(registrationResponse.message);
    }
});

router.post('/logout', (req: AuthenticatedRequest, res: Response) => {
    if (removeSession(req)){
        res.clearCookie('sessionID');
        res.send('Logged out')
    } else { // No session exists on auth header or session store
        res.send('No session exists to log out from')
    }
});

module.exports = router;