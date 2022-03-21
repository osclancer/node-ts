import { ValidationError as YupValidationError } from 'yup';
import BaseError from './baseError';

class ValidationError extends BaseError {
	statusCode = 422; // Unprocessable entity

	constructor(public error: YupValidationError) {
		super();
	}

	serializeErrors() {
		return this.error.inner.map((err) => {
			return { message: err.message, field: err.path };
		});
	}
}

export default ValidationError;
