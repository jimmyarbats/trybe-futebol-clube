import { Request, Router, Response } from 'express';
import TokenValidation from '../middlewares/TokenValidation';
import UserValidation from '../middlewares/UserValidation';
import UserController from '../controllers/UsersController';

const userController = new UserController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.getAll(req, res));

router.get(
  '/role',
  TokenValidation.tokenValidation,
  (req: Request, res: Response) => userController.getRole(req, res),
);

router.get('/:id', (req: Request, res: Response) => userController.getById(req, res));

router.post(
  '/',
  UserValidation.userValidation,
  (req: Request, res: Response) => userController.getByEmail(req, res),
);

export default router;
