import BaseError from './baseError';

class NotFoundError extends BaseError {
	statusCode = 404; // Not found

	constructor(message: string = 'Not Found') {
        super(message);
        this.message = message;
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}

export default NotFoundError;
