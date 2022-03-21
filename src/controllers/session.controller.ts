import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { UserDocument } from '../models/user.model';
import {
	createAccessToken,
	createSession,
	getSessions,
	updateSession,
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { decode, sign } from '../utils/jwt.util';
import config from 'config';
import UnAuthenticatedError from '../errors/unAuthenticatedError';

export const createSessionHandler = async (
	req: Request<{}, {}, Pick<UserDocument, 'email' | 'password'>>,
	res: Response,
	next: NextFunction
) => {
	const user = await validatePassword(req.body);

	if (!user) return next(new UnAuthenticatedError('Invalid credentials'));

	const session = await createSession(
		get(user, '_id'),
		req.get('user-agent') as string
	);

	const accessToken = await createAccessToken({
		user,
		sessionId: session._id,
	});

	const refreshToken = await sign(session, {
		expiresIn: config.get('refreshTokenTtl'), // One Year
	});

	return res.send({ accessToken, refreshToken });
};

export const getSessionsHandler = async (req: Request, res: Response) => {
	const userId = get(req, 'user._id');

	const sessions = await getSessions({ userId });

	return res.send(sessions);
};

export const invalidateSessionHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const sessionId = get(req, 'user.sessionId');

	const session = updateSession({ _id: sessionId }, { valid: false });

	if (!session) return next(new UnAuthenticatedError('Invalid Session'));

	return res.sendStatus(200);
};
