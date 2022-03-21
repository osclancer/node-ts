import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import EmailAlreadyExists from '../errors/emailAlreadyExistsError';
import { UserDocument } from '../models/user.model';
import { createUser } from '../services/user.service';

export const createUserHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {

	const user = await createUser(req.body) as UserDocument | false;
	
	if(! user) return next(new EmailAlreadyExists());
	
	return res.status(201).send(omit(user.toJSON(), 'password'));
};
