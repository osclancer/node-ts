import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import User, { UserDocument } from '../models/user.model';
import Service from './service';

class UserService implements Service {
	async create<UserDocument>(
		input: DocumentDefinition<
			Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
		>
	) {
		const user = new User(input);

		const savedUser = await user.save();

		if (!savedUser) throw Error();
		return savedUser;
	}

	async find<UserDocument>(
		query: FilterQuery<UserDocument>,
		options?: QueryOptions | undefined
	): Promise<UserDocument | null> {
		return await User.findOne(query, {}, options);
	}

	async validatePassword({
		email,
		password,
	}: {
		email: UserDocument['email'];
		password: string;
	}): Promise<false | Omit<UserDocument, 'password'>>  {
		const user = (await this.find({ email })) as UserDocument;

		console.log(email);

		if (!user) return false;
	
		const isValid = await user.comparePassword(password);
	
		if (!isValid) return false;
	
		return omit(user.toJSON(), 'password') as UserDocument;
	}
}

export default UserService;
