import request, { Request } from 'supertest';
import App from '../app';
import { userPayload } from './payloads';

const app = (new App()).app;

export const signUp = async () => {
	return await request(app).post('/api/users').send(userPayload).expect(201);
};

export const signIn = async (data: { email: string; password: string }) => {
	const response = await request(app)
		.post('/api/sessions')
		.send(data)
		.expect(200);

    const cookie = response.get('Set-Cookie');

    console.log(cookie);

    return cookie;
};
