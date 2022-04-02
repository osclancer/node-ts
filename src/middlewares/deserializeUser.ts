import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { TokenService } from '../services';
import { decode } from '../utils/jwt.util';

const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.accessToken || !req.session?.refreshToken) return next();

	const { accessToken, refreshToken } = req.session;


	const { decoded, expired } = await decode(accessToken);

	if (decoded) {
		// @ts-ignore
		req.user = decoded;
		return next();
	}

	if (refreshToken && expired) {
		const newAccessToken = await new TokenService().reCreate(refreshToken);

		if (newAccessToken) {

			req.session = {
				accessToken,
				refreshToken,
			};

			const { decoded } = await decode(newAccessToken);
			// @ts-ignore
			req.user = decoded;
		}

		return next();
	}

	return next();
};

export default deserializeUser;
