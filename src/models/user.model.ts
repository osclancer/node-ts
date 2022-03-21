import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';



export type UserType = {
	_id: mongoose.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserDocument extends Document {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;

	/**
	 *
	 * @param plainPassword the plain text password to compare with the hashed one
	 */
	comparePassword(plainPassword: string): Promise<boolean>;
}

const requiredString = {
	type: String,
	required: true,
};

const userSchema = new Schema(
	{
		name: requiredString,
		email: { ...requiredString, unique: true },
		password: requiredString,
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	let user = this as UserDocument;

	if (!user.isModified('password')) return next();

	const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

	const hash = await bcrypt.hashSync(user.password, salt);

	user.password = hash;
});

userSchema.methods.comparePassword = async function (
	plainPassword: string
): Promise<boolean> {
	const user = this as UserDocument;

	return await bcrypt.compareSync(plainPassword, user.password);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
