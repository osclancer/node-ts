import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { UserDocument } from '../models/user.model';
import { sign } from '../utils/jwt.util';
import { UnAuthenticatedError } from '@thefeqyorg/error-handlers';
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
			userId: get(user, 'id'),
			userAgent: req.get('user-agent') as string,
		});

		const accessToken = await this.tokenService.create({
			user,
			sessionId: session.id,
		});

		const refreshToken = await sign(session, {
			expiresIn: process.env.RTTTL, // One Year
		});

		req.session = {
			accessToken,
			refreshToken,
		};

		return res.send({ user });
	}

	async all(req: Request, res: Response) {
		const userId = get(req, 'user.id');

		const sessions = await this.Service.all({ userId });

		return res.json(sessions);
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const sessionId = get(req, 'user.sessionId');

		const session = this.Service.update(
			{ id: sessionId },
			{ valid: false }
		);

		if (!session) return next(new UnAuthenticatedError('Invalid Session'));

		return res.sendStatus(204);
	}
}

export default SessionController;
