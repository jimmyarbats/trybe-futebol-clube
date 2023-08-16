import { Router } from 'express';
import teamRouter from './teams.router';
import userRouter from './users.router';
import matchRouter from './matches.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
