import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../services';
import { UserPayload } from '../types/Documents';
import { decode } from '../utils/jwt.util';

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload;
		}
	}
}

const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.accessToken || !req.session?.refreshToken) return next();

	const { accessToken, refreshToken } = req.session;


	const { decoded, expired } = await decode(accessToken);

	if (decoded) {
		req.user = decoded as UserPayload;
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

			req.user = decoded as UserPayload;
		}

		return next();
	}

	return next();
};

export default deserializeUser;
