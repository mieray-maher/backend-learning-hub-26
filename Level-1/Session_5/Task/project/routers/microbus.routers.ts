import { Router } from "express";
import {getfleet, getfleetbyid, postfleet, putfleetbyid, deletefleetbyid, maxfare, getraterandid} from "../controllers/microbus.controller";
import {validateMicrobus , logging} from "../middleware/microbus.middleware";

const router = Router();

router.use(logging);

router.get('/fleet', getfleet);
router.get('/fleet/:id', getfleetbyid);
router.post('/fleet', postfleet);
router.put('/fleet/:id',putfleetbyid);
router.delete('/fleet/:id', deletefleetbyid);
router.get('/fleet/filter?maxFare=number', maxfare);
router.get('/fleet/rate/:id', getraterandid);



export default router;