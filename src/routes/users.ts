import { Router } from 'express';

import UserController from '../controllers/user.controller';
import { validateRequest } from '../middlewares';
import { createUserSchema } from '../validators/user.schema';

const router = Router();
const controller = new UserController();

router.post('/', validateRequest(createUserSchema), controller.create);

export default router;
