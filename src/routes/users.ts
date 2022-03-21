import { Router } from 'express';

import { createUserHandler } from '../controllers/user.controller';
import { validateRequest } from '../middlewares';
import { createUserSchema } from '../validators/user.schema';

const router = Router();

router.post('/', validateRequest(createUserSchema), createUserHandler);

export default router;
