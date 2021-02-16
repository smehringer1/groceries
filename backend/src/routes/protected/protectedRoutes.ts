import express, {Request, Response} from 'express';
import {authenticateToken} from '../../utils/authFunctions'
import { AuthenticatedRequest } from '../../utils/interfaces';

const router = express.Router();

let groceryRoutes = require('./groceryRoutes');

router.use(authenticateToken);
router.get('/', (req: AuthenticatedRequest, res : Response) => {
    res.send("Authenticated success. Access permitted to protected resources.")
})
router.use('/groceries', groceryRoutes);


module.exports = router;