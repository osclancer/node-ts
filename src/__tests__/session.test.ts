import request from 'supertest';
import server from '../server';
import { signUp } from './helpers';

const app = server();

describe('session', () => {
	describe('create session', () => {
		describe('given an invalid credentials', () => {
			it('should return 401 unAuthenticated', () => {
				request(app)
					.post('/api/sessions')
					.send({ email: 'fakemail@gmail.com', password: 123456 })
					.expect(401);
			});
		});

		describe('given valid credentials', () => {
			it('should return accessToken && refreshToken', async () => {
				await signUp();

				request(app)
					.post('/api/sessions')
					.send({
						email: 'muhammed@gmail.com',
						password: '123456',
					})
					.then((data) => {
						expect(data).toHaveProperty('accessToken');
						expect(data).toHaveProperty('refreshToken');
					})
					expect(200);
			});
		});
	});
});
