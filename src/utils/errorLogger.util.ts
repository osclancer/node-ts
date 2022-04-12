import dayjs from 'dayjs';
import fs from 'fs';
import util from 'util';

const logFile = fs.createWriteStream(__dirname + '/../logs/error.log', { flags: 'w' });
const logStdout = process.stdout;

export const enableLogging = () => {
    global.console.error = d => {
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss A');
        logFile.write(`[${time}] : ${util.format(d)}\n ---------------- \n`);
        // logStdout.write(util.format(d) + '\n');
    }
}
