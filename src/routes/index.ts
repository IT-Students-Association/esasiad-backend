import Router from 'express';
import auth from './auth';
import user from "./user";
import group from "./group";

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/group', group);

export default router;