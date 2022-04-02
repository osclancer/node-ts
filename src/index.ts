import dotenv from 'dotenv';
import logger from './utils/logger.util';
import dbConnect from './utils/dbConnect.util';
import server from './server';


// Declarations
dotenv.config();
const app = server();
const port = process.env.APP_PORT;

app.listen(port, async () => {
    if(! process.env.PRIVATE_KEY) {
        console.log("Private key must be defined");
		process.exit(1);
    }

	logger.info(`Server is running on http://localhost:${port}`);
	await dbConnect();
});
