import mongoose from 'mongoose';
import logger from './logger.util';

export default async () => {
	const dbURL = process.env.DB_URL as string;

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
