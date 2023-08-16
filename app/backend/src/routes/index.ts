import { Router } from 'express';
import teamRouter from './teams.router';
import userRouter from './users.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);

export default router;
