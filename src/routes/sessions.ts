import { req } from '@thefeqyorg/error-handlers';
import { Router } from 'express';
import SessionController from '../controllers/session.controller';
import { requiresUser, validateRequest } from '../middlewares';
import { createSessionSchema } from '../validators/session.schema';
import Route from './route';
class SessionRouter implements Route {
	path = '/sessions';
	router = Router();
	controller = new SessionController();

	constructor() {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router
			.route(this.path)
			.get(requiresUser, req(this.controller.all)) // GET SESSION
			.post(validateRequest(createSessionSchema), req(this.controller.create)) // USER LOGIN
			.delete(requiresUser, req(this.controller.delete)); // LOGOUT USER
	}
}

export default SessionRouter;
