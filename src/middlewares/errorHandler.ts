import { BaseError } from '@thefeqyorg/error-handlers';
import { Request, Response, NextFunction } from 'express';
import { deleteUploadsOnFailure, getFilesPaths } from '../utils/upload.util';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {

    if (err instanceof BaseError) {
        return res
            .status(err.statusCode)
            .json({ errors: err.serializeErrors() });
    }

    deleteUploadsOnFailure(req);

    console.error(err);

    return res.status(500).json({
        errors: [{ message: 'Something went wrong' }],
    });
};

export default errorHandler;