import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import { EmailAlreadyExists } from '@thefeqyorg/error-handlers';
import { UserDocument } from '../models/user.model';
import UserService from '../services/user.service';
import Controller from './controller';
class UserController extends Controller<UserService> {
	constructor() {
		super(new UserService());

		this.create = this.create.bind(this);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const emailExists = await this.Service.find({ email: req.body.email });

		if (emailExists) return next(new EmailAlreadyExists());

		const user = (await this.Service.create(req.body)) as UserDocument;

		if (user) {
			return res.status(201).json(omit(user.toJSON(), 'password'));
		}
	}
}

export default UserController;
