import Router from 'express';
import auth from './auth';
import user from "./user";
import group from "./group";
import post from "./post";

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/group', group);
router.use('/post', post);


export default router;