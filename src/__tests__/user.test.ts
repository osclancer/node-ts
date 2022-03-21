import request from 'supertest';
import server from '../server';
import { signUp } from './helpers';
import { userPayload } from './payloads';

const app = server();

describe('user', () => {
	describe('create user (REGISTER)', () => {
		describe('given a valid user details', () => {
			it('Creates a user with 201 `created` statusCode', async () => {
				await signUp();
			});
		});

		describe('Given Invalid Email', () => {
			it('Will throw 422 error', async () => {
				const nonValidUserPayload = {
					...userPayload,
					email: 'No Valid Mail',
				};
				await request(app)
					.post('/api/users')
					.send(nonValidUserPayload)
					.expect(422);
			});
		});

		describe('given a duplicate email', () => {
			it('should return 409 conflict', async () => {
				await signUp();
				const { text } = await request(app)
					.post('/api/users')
					.send(userPayload)
					.expect(409);

				expect(JSON.parse(text)?.errors[0]?.message).toBe('Email is already exists!');
			});
		});
	});
});
