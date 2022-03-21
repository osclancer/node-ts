import { Router } from 'express';

import {
	createSessionHandler,
	getSessionsHandler,
	invalidateSessionHandler,
} from '../controllers/session.controller';
import { requiresUser, validateRequest } from '../middlewares';
import { createSessionSchema } from '../validators/session.schema';

const router = Router();

router
	.route('/')
	.get(requiresUser, getSessionsHandler) // GET SESSION
	.post(validateRequest(createSessionSchema), createSessionHandler) // USER LOGIN
	.delete(requiresUser, invalidateSessionHandler); // LOGOUT USER

export default router;
				