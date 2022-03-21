import mongoose from 'mongoose';
import config from 'config';
import logger from './logger.util';

export default async () => {
	const dbURL = config.get<string>('dbURL');

	return await mongoose
		.connect(dbURL)
		.then(() => {
			logger.info('DB Connected!');
		})
		.catch((error) => {
			logger.error('Database Error', error);
			process.exit(1);
		});
};
