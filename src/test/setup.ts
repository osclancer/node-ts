import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import server from '../server';
import { signUp } from '../__tests__/helpers';
import { UserType } from '../models/user.model';

const app = server();

let mongo: any;

declare global {
	function signIn(): Promise<{ cookie: string[], user: UserType }>;
}

beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	await mongoose.connect(mongo.getUri());
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	// await mongo.stop();
	// await mongoose.connection.close();
});

global.signIn = async () => {
	const userResponse = await signUp();
	const response = await request(app)
		.post('/api/sessions')
		.send({
			email: 'muhammed@gmail.com',
			password: '123456',
		})
		.expect(200);

	const cookie = response.get('Set-Cookie');

	return { cookie, user: userResponse.body };
};
