import {
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';
import Session from '../models/session.model';
import { UserDocument } from '../models/user.model';
import Service from './service';

class SessionService implements Service {
	async create({
		userId,
		userAgent,
	}: {
		userId: UserDocument['_id'];
		userAgent: string;
	}) {
		const session = new Session({ userId, userAgent });

		const savedSession = await session.save();

		if (!savedSession) throw Error();

		return savedSession.toJSON();
	}

	async find<SessionDocument>(
		query: FilterQuery<SessionDocument>,
		options?: QueryOptions
	): Promise<SessionDocument | null | boolean> {
		return await Session.findOne(query, {}, options);
	}

	async all<SessionDocument>(
		query: FilterQuery<SessionDocument> = {}
	): Promise<SessionDocument[] | null | boolean> {
		return await Session.find(query);
	}

	async update<SessionDocument>(
		query: FilterQuery<SessionDocument>,
		update: UpdateQuery<SessionDocument>,
		options: QueryOptions = { new: true }
	) {
		return await Session.findOneAndUpdate(query, update, options);
	}
}

export default SessionService;