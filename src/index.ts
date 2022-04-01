import logger from './utils/logger.util';
import dotenv from 'dotenv';
import dbConnect from './utils/dbConnect.util';
import server from './server';


// Declarations
dotenv.config();
const app = server();
const port = process.env.APP_PORT;

app.listen(port, async () => {
	logger.info(`Server is running on http://localhost:${port}`);
	await dbConnect();
});
