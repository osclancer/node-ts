import BaseError from './baseError';

class DatabaseConnectionError extends BaseError {
	statusCode = 500;

	constructor(public message: string = 'DB Connecting Error') {
		super(message);
        this.message = message;
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}

export default DatabaseConnectionError;
