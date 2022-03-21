import {
	LeanDocument,
	LeanDocumentElement,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';
import Session, { SessionDocument } from '../models/session.model';
import { UserDocument } from '../models/user.model';
import { decode, sign } from '../utils/jwt.util';
import config from 'config';
import { get, omit } from 'lodash';
import { findUser } from './user.service';

export const findSession = async (
	query: FilterQuery<SessionDocument>,
	options?: QueryOptions
): Promise<SessionDocument | null | false> => {
	return await Session.findOne(query, {}, options).catch((e) => false);
};

export const getSessions = async (query: FilterQuery<SessionDocument>) => {
	return await Session.find(query).catch((e) => false);
};

export const createSession = async (
	userId: UserDocument['_id'],
	userAgent: string
) => {
	const session = await Session.create({ userId, userAgent });

	return session.toJSON();
};

export const updateSession = async (
	query: FilterQuery<SessionDocument>,
	update: UpdateQuery<SessionDocument>,
	options: QueryOptions = { new: true }
) => {
	return await Session.findOneAndUpdate(query, update, options).catch(
		(e) => false
	);
};

export const createAccessToken = async ({
	user,
	sessionId,
}: {
	user:
		| Omit<UserDocument, 'password'>
		| LeanDocument<Omit<UserDocument, 'password'>>;
	sessionId: LeanDocumentElement<SessionDocument['_id']>;
}) => {
	const accessToken = await sign(
		{ ...user, sessionId },
		{ expiresIn: config.get('accessTokenTtl') }
	);

	return accessToken;
};

export const reCreateAccessToken = async (refreshToken: string) => {
	const { decoded } = await decode(refreshToken);

	if (!decoded || !get(decoded, '_id')) return false;

	const session = await findSession({ _id: get(decoded, '_id') });

	if (!session || !session.valid) return false;

	const user = (await findUser(
		{ _id: session.userId },
		{ lean: true }
	)) as LeanDocument<UserDocument>;

	if (!user) return false;

	const accessToken = createAccessToken({
		user: omit(user, 'password') as UserDocument,
		sessionId: session.id,
	});

	return accessToken;
};
