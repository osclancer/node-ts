import BaseError from './baseError';

class EmailAlreadyExists extends BaseError {
	statusCode = 409; // conflict

	constructor(message: string = 'Email is already exists!') {
		super(message);
		this.message = message;
	}

	serializeErrors() {
		return [{ message: this.message, field: 'email' }];
	}
}

export default EmailAlreadyExists;
