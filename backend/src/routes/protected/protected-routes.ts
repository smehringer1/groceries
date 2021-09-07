import express, {Request, Response} from 'express';
import {authenticateSession} from '../../sessions/sessions'
import { AuthenticatedRequest } from '../../utils/interfaces';

const router = express.Router();

// All protected routes are placed within this greater route

router.use(authenticateSession);

router.get('/', (req: AuthenticatedRequest, res : Response) => {
    res.send("Authenticated success. Access permitted to protected resources.")
})

const groceryRouter = require('./grocery-routes');
router.use('/groceries', groceryRouter);

const smartRouter = require('./smart-routes');
router.use('/smart', smartRouter);

module.exports = router;