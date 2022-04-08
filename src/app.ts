import cookieSession from 'cookie-session';
import express from 'express';
import cors from 'cors';
import { deserializeUser } from './middlewares';
import Route from './routes/route';
import logger from './utils/logger.util';
import dbConnectUtil from './utils/dbConnect.util';
import UserRouter from './routes/users';
import SessionRouter from './routes/sessions';
import { errorHandler, req } from '@thefeqyorg/error-handlers';
import dotenv from 'dotenv';
import notfound from './routes/notfound';
import path from 'path';
class App {
	public app: express.Application;
	public port: number;
	private routes: Route[] = [new UserRouter(), new SessionRouter()];

	constructor() {
		this.app = express();
		this.port = parseInt(<string>process.env.APP_PORT) || 5000;

		this.initializeMiddleware();
		this.initializeRoutes(this.routes);
		this.initializeErrorHandler();
	}

	private initializeMiddleware() {
		dotenv.config();
		this.app.set('trust proxy', true);
		this.app.use(
			cookieSession({
				signed: false,
				secure: process.env.NODE_ENV === 'production',
			})
		);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(
			'/public',
			express.static(path.join(__dirname, '..', 'public'))
		);
		this.app.use(cors());
		this.app.use(deserializeUser);
	}

	private initializeRoutes(routes: Route[]) {
		routes.forEach((route) => {
			this.app.use('/api/', route.router);
		});

		this.app.use('*', req(notfound));
	}

	private initializeErrorHandler() {
		this.app.use(errorHandler);
	}

	public listen() {
		this.app.listen(this.port, async () => {
			if (!process.env.PRIVATE_KEY) {
				console.log('Private key must be defined');
				process.exit(1);
			}

			logger.info(`Server is running on http://localhost:${this.port}`);
			await dbConnectUtil();
		});
	}
}

export default App;
