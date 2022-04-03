import request from 'supertest';
import server from '../server';
import { signIn, signUp } from './helpers';

const app = server();
const URI = '/api/sessions';

describe('session', () => {
	describe('create session', () => {
		describe('given an invalid credentials', () => {
			it('should return 401 unAuthenticated', async () => {
				await request(app)
					.post(URI)
					.send({ email: 'fakemail@gmail.com', password: 123456 })
					.expect(401);
			});
		});

		describe('given valid credentials', () => {
			it('should return User data', async () => {
				await signUp();

				const response = await request(app)
					.post(URI)
					.send({
						email: 'muhammed@gmail.com',
						password: '123456',
					})
					.expect(200);

				expect(response.get('Set-Cookie')).toBeDefined();
			});
		});
	});

	describe('return all sessions', () => {
		it('Returns unAuthorized of the given cookie is invalid', async () => {
			const { cookie, user } = await global.signIn();

			await request(app)
				.get(URI)
				.set('Cookie', ['fake cookie'])
				.expect(403);
		});

		it('returns all stored sessions | if cookie is valid', async () => {
			const { cookie, user } = await global.signIn();

			const response = await request(app).get(URI).set('Cookie', cookie);

			expect(response.body[0].userId).toEqual(user.id);
		});
	});

	it('Deletes the given session', async () => {
		const { cookie } = await global.signIn();

		await request(app).delete(URI).set('Cookie', cookie).expect(204);
	});
});
