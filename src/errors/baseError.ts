interface ErrorMessage {
	message: string;
	field?: string;
}

abstract class BaseError extends Error {
	abstract statusCode: number;
	
	constructor(message: string = "an error occurred") {
		super();
	}

	abstract serializeErrors(): Array<ErrorMessage>;
}

export default BaseError;
