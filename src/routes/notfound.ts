import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '@thefeqyorg/error-handlers';

export default (req: Request, res: Response, next: NextFunction) => {
	throw new NotFoundError('Error 404 | Not Found!');
};
