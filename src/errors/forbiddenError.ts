import BaseError from "./baseError";

class ForbiddenError extends BaseError {
    statusCode = 403;

    constructor(message: string = "You haven't the right access to be here") {
        super(message);
        this.message = message;
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}

export default ForbiddenError;