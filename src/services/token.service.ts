import { UserDocument } from '../models/user.model';
import Service from './service';
import { LeanDocument, LeanDocumentElement } from 'mongoose';
import { decode, sign } from '../utils/jwt.util';
import { get, omit } from 'lodash';
import { SessionDocument } from '../models/session.model';
import SessionService from './session.service';
import UserService from './user.service';

class TokenService implements Service {
	session: SessionService;
	user: UserService;

	constructor() {
		this.session = new SessionService();
		this.user = new UserService();
	}

	async create({
		user,
		sessionId,
	}: {
		user:
			| Omit<UserDocument, 'password'>
			| LeanDocument<Omit<UserDocument, 'password'>>;
		sessionId: LeanDocumentElement<SessionDocument['_id']>;
	}) {
		const accessToken = await sign(
			{ ...user, sessionId },
			{ expiresIn: process.env.ATTTL }
		);

		return accessToken;
	}

	// Recreate AccessToken By Refresh Token
	async reCreate(refreshToken: string) {
		const { decoded } = await decode(refreshToken);

		if (!decoded || !get(decoded, '_id')) return false;

		const session = (await this.session.find({
			_id: get(decoded, '_id'),
		})) as SessionDocument;

		if (!session || !session.valid) return false;

		const user = (await this.user.find(
			{ _id: session.userId },
			{ lean: true }
		)) as LeanDocument<UserDocument>;

		if (!user) return false;

		const accessToken = this.create({
			user: omit(user, 'password') as UserDocument,
			sessionId: session.id,
		});

		return accessToken;
	}
}

export default TokenService;
