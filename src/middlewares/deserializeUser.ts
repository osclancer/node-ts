import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { reCreateAccessToken } from '../services/session.service';
import { decode } from '../utils/jwt.util';

const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = get(req, 'headers.authorization')?.replace(
		/^Bearer\s/,
		''
	);

	const refreshToken = get(req, 'headers.x-refresh');

	if (!accessToken) return next();

	const { decoded, expired } = await decode(accessToken);

	if (decoded) {
		// @ts-ignore
		req.user = decoded;
		return next();
	}

	if (refreshToken && expired) {
		const newAccessToken = await reCreateAccessToken(refreshToken);

		if (newAccessToken) {
			res.setHeader('x-access-token', newAccessToken);

			const { decoded } = await decode(newAccessToken);
			// @ts-ignore
			req.user = decoded;
		}

		return next();
	}

	return next();
};

export default deserializeUser;
