import express, {Response} from "express";
import { SmartOutlets } from "../../services/SmartOutlets";
import { AuthenticatedRequest } from "../../utils/interfaces";

const router = express.Router();

let outlets = new SmartOutlets();
outlets.setUp();

router.post('/on', async (req : AuthenticatedRequest, res : Response) => {
    outlets.turnOn();
    res.send("On");
})

router.post('/off', async (req : AuthenticatedRequest, res : Response) => {
    outlets.turnOff();
    res.send("Off");
})


module.exports = router;