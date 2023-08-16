import { Request, Router, Response } from 'express';
import TokenValidation from '../middlewares/TokenValidation';
import MatchValidation from '../middlewares/MatchValidation';
import MatchController from '../controllers/MatchesController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAll(req, res));

router.get('/:id', (req: Request, res: Response) => matchController.getById(req, res));

router.patch(
  '/:id/finish',
  TokenValidation.tokenValidation,
  (req: Request, res: Response) => matchController.finish(req, res),
);

router.patch(
  '/:id',
  TokenValidation.tokenValidation,
  (req: Request, res: Response) => matchController.update(req, res),
);

router.post(
  '/',
  TokenValidation.tokenValidation,
  MatchValidation.matchValidation,
  (req: Request, res: Response) => matchController.create(req, res),
);

export default router;
