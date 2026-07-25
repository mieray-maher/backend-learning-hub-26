import {Router} from 'express';
import { singup, signin, singout, profile, adminonly } from '../controller/controller';
import { authorization, authentication } from '../middleware/middleware';

const router = Router();

router.post('/signup',singup);
router.post('/singin',signin);
router.get('/signout',singout);
router.get('/profile',authentication, profile);
router.get('/adminonly', authentication, authorization, adminonly);
export {router}