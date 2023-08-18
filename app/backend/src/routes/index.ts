import { Router } from 'express';
import teamRouter from './teams.router';
import userRouter from './users.router';
import matchRouter from './matches.router';
import leaderboardRouter from './leaderboard.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
