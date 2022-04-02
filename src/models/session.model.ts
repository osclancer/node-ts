import { Schema, Document, model } from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends Document {
	userId: UserDocument['_id'];
	valid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}

const sessionSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		valid: {
			type: Boolean,
			default: true,
		},
		userAgent: {
			type: String,
		},
	},
	{
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
			},
		},
		timestamps: true,
	}
);

const Session = model<SessionDocument>('Session', sessionSchema);

export default Session;
