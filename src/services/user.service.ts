import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery, LeanDocument, QueryOptions } from 'mongoose';
import User, { UserDocument } from '../models/user.model';

export const createUser = async (
	input: DocumentDefinition<
		Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
	>
) => {
	return await User.create(input).catch(e => false);
};

export const findUser = async (
	query: FilterQuery<UserDocument>,
    options?: QueryOptions | undefined
): Promise<UserDocument | boolean | null> => {
	return await User.findOne(query, {}, options).catch((e) => false);
};

export const validatePassword = async ({
	email,
	password,
}: {
	email: UserDocument['email'];
	password: string;
}) : Promise<false | Omit<UserDocument, 'password'>> => {
	const user = (await findUser({ email })) as UserDocument;

	if (!user) return false;

	const isValid = await user.comparePassword(password);

	if (!isValid) return false;

	return omit(user.toJSON(), 'password') as UserDocument;
};
