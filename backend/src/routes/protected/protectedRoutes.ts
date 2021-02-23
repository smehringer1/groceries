import express, {Request, Response} from 'express';
import {authenticateSession} from '../../sessions/sessions'
import { AuthenticatedRequest } from '../../utils/interfaces';

const router = express.Router();

let groceryRoutes = require('./groceryRoutes');

router.use(authenticateSession);

router.get('/', (req: AuthenticatedRequest, res : Response) => {
    res.send("Authenticated success. Access permitted to protected resources.")
})

router.use('/groceries', groceryRoutes);


module.exports = router;