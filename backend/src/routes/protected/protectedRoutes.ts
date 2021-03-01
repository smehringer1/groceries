import express, {Request, Response} from 'express';
import {authenticateSession} from '../../sessions/sessions'
import { AuthenticatedRequest } from '../../utils/interfaces';

const router = express.Router();

router.use(authenticateSession);

router.get('/', (req: AuthenticatedRequest, res : Response) => {
    res.send("Authenticated success. Access permitted to protected resources.")
})

let groceryRouter = require('./groceryRoutes');
router.use('/groceries', groceryRouter);

// let smartRouter = require('./smartRoutes');
// router.use('/smart', smartRouter);

module.exports = router;