import logger from './utils/logger.util';
import config from 'config';
import dbConnect from './utils/dbConnect.util';
import server from './server';

// Declarations
const app = server();
const port = config.get<number>('port');

app.listen(port, async () => {
	logger.info(`Server is running on http://localhost:${port}`);
	await dbConnect();
});
