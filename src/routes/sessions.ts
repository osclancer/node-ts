import { Router } from 'express';

import SessionController from '../controllers/session.controller';
import { requiresUser, validateRequest } from '../middlewares';
import { createSessionSchema } from '../validators/session.schema';

const router = Router();

const controller = new SessionController();

router
	.route('/')
	.get(requiresUser, controller.all) // GET SESSION
	.post(validateRequest(createSessionSchema), controller.create) // USER LOGIN
	.delete(requiresUser, controller.delete); // LOGOUT USER

export default router;
