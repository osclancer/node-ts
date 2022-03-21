import logger from './utils/logger.util';
import config from 'config';
import dbConnect from './utils/dbConnect.util';
import createServer from './server';

// Declarations
const app = createServer();
const port = config.get<number>('port');

app.listen(port, async () => {
	logger.info(`Server is running on http://localhost:${port}`);
	await dbConnect();
});
