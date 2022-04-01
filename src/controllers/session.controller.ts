import { NextFunction, Request, Response } from 'express';
import { get, omit } from 'lodash';
import { UserDocument } from '../models/user.model';
import { decode, sign } from '../utils/jwt.util';
import UnAuthenticatedError from '../errors/unAuthenticatedError';
import Controller from './controller';
import { SessionService, TokenService, UserService } from '../services';

class SessionController extends Controller<SessionService> {
	userService: UserService;
	tokenService: TokenService;

	constructor() {
		super(new SessionService());
		this.userService = new UserService();
		this.tokenService = new TokenService();

		this.create = this.create.bind(this);
		this.all = this.all.bind(this);
		this.delete = this.delete.bind(this);
	}

	async create(
		req: Request<{}, {}, Pick<UserDocument, 'email' | 'password'>>,
		res: Response,
		next: NextFunction
	) {
		const user = await this.userService.validatePassword(req.body);

		if (!user) return next(new UnAuthenticatedError('Invalid credentials'));

		const session = await this.Service.create({
			userId: get(user, '_id'),
			userAgent: req.get('user-agent') as string,
		});

		const accessToken = await this.tokenService.create({
			user,
			sessionId: session._id,
		});

		const refreshToken = await sign(session, {
			expiresIn: process.env.RTTTL, // One Year
		});

		return res.send({ accessToken, refreshToken });
	}

	async all(req: Request, res: Response) {
		const userId = get(req, 'user._id');

		const sessions = await this.Service.all({ userId });

		return res.json(sessions);
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const sessionId = get(req, 'user.sessionId');

		const session = this.Service.update(
			{ _id: sessionId },
			{ valid: false }
		);

		if (!session) return next(new UnAuthenticatedError('Invalid Session'));

		return res.sendStatus(200);
	}
}

export default SessionController;
