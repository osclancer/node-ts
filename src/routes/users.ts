import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateRequest } from '../middlewares';
import { createUserSchema } from '../validators/user.schema';
import Route from './route';

class UserRouter implements Route {
	path = '/users';
	router = Router();
	controller = new UserController();

    constructor() {
        this.initializeRoutes();
    }

	initializeRoutes() {
		this.router.post(
			this.path,
			validateRequest(createUserSchema),
			this.controller.create
		);
	}
}

export default UserRouter;
