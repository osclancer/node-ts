import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { deserializeUser } from './middlewares';
import { errorHandler } from '@thefeqyorg/error-handlers';
import users from './routes/users';
import sessions from './routes/sessions';
import notfound from './routes/notfound';

const server = () => {
	// Declarations
	const app = express();
	app.set('trust proxy', true);

	// Middlewares
	app.use(express.json());
	app.use(
		cookieSession({
			signed: false,
			secure: false,
			// secure: process.env.NODE_ENV !== 'test',
		})
	);
	app.use(express.urlencoded({ extended: false }));
	app.use(cors());
	app.use(deserializeUser);

	// Routes
	app.use('/api/users', users);
	app.use('/api/sessions', sessions);
	app.use('*', notfound); // NOT FOUND ROUTER

	// Error Handler
	app.use(errorHandler);

	return app;
};

export default server;
