import express, {Request, Response} from 'express';
import {AuthenticatedRequest, LoginCredentials, RegistrationCredentials, LoginRegistrationResponse} from '../utils/interfaces'
import {ensureUnauthenticated, removeSession} from '../sessions/sessions'
import { login, register } from '../services/user-service';

const router = express.Router();

router.post('/login', ensureUnauthenticated, async (req: Request, res: Response) => {
    const loginCredentials : LoginCredentials = req.body;
    console.log("Login request:");
    console.log(loginCredentials);
    const loginResponse : LoginRegistrationResponse = await login(loginCredentials);
    if (loginResponse.success) {
        res.cookie('sessionID', loginResponse.sessionID, {httpOnly : true})
        res.json({
            "success" : true,
            "sessionData" : loginResponse.sessionData
        });  
    } else {
        res.json({
            "success" : false
        })
    }
    
})

router.post('/register', ensureUnauthenticated, async (req: Request, res: Response) => {
    let newAccount : RegistrationCredentials = req.body;
    console.log("Register request:");
    console.log(newAccount);
    let registrationResponse = await register(newAccount);
    if (registrationResponse.success){
        res.cookie('sessionID', registrationResponse.sessionID, {httpOnly : true})
        res.json({
            "success" : true,
            "sessionData" : registrationResponse.sessionData
        });  
    } else {
        res.json({
            "success" : false
        })
    }
});

router.post('/logout', (req: AuthenticatedRequest, res: Response) => {
    console.log("Logout request");
    if (removeSession(req)){
        res.clearCookie('sessionID');
        res.json({
            "success" : true
        })
    } else { // No session exists on auth header or session store
        res.json({
            "success" : false
        })
    }
});

module.exports = router;