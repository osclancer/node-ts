import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/baseError';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof BaseError) {
        return res
            .status(err.statusCode)
            .json({ errors: err.serializeErrors() });
    }

    return res.status(500).json({
        errors: [{ message: 'Something went wrong' }],
    });
};

export default errorHandler;