import express from 'express';
import cors from 'cors';
import { deserializeUser } from './middlewares';
import errorHandler from './middlewares/errorHandler';
import users from './routes/users';
import sessions from './routes/sessions';
import notfound from './routes/notfound';

const server = () => {
	// Declarations
	const app = express();

	// Middlewares
	app.use(deserializeUser);
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	// Routes
	app.use('/api/users', users);
	app.use('/api/sessions', sessions);
	app.use('*', notfound); // NOT FOUND ROUTER

	// Error Handler
	app.use(errorHandler);

	return app;
};

export default server;
