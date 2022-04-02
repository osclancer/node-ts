import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { deserializeUser } from './middlewares';
import errorHandler from './middlewares/errorHandler';
import users from './routes/users';
import sessions from './routes/sessions';
import notfound from './routes/notfound';

const server = () => {
	// Declarations
	const app = express();
	app.set('trust proxy', true);

	// Middlewares
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(
		cookieSession({
			signed: false,
			secure: process.env.NODE_ENV !== 'development',
		})
	);
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
