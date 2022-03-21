import request from 'supertest'
import server from '../server'
import { userPayload } from './payloads';

const app = server();

export const signUp = async () => {
    return await request(app)
        .post('/api/users')
        .send(userPayload)
        .expect(201);
}