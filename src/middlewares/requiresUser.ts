import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { ForbiddenError } from '@thefeqyorg/error-handlers'

const requiresUser = (req: Request, res: Response, next: NextFunction) => {
	const user = get(req, 'user');

	if (!user) return next(new ForbiddenError);

	return next();
};

export default requiresUser;
