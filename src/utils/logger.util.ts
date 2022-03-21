import dayjs from 'dayjs';
import pino from 'pino';

const logger = pino({
	base: {
		pid: false,
	},
	transport: {
		target: 'pino-pretty',
	},
    timestamp: () => `,"time": "${dayjs().format('YYYY-MM-DD HH:mm:ssA')}"`
});

export default logger;