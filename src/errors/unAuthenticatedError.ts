import BaseError from "./baseError";

class UnAuthenticatedError extends BaseError {
    statusCode = 401; // UnAuthenticated

    constructor(message: string = "UnAuthenticated!") {
        super(message);
        this.message = message;
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}

export default UnAuthenticatedError;