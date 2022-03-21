import jwt, { SignOptions, Secret, JwtPayload } from 'jsonwebtoken';
import config from 'config';
const privateKey = config.get('privateKey') as Secret;

export const sign = async (
	payload: object | string,
	options?: SignOptions | undefined
) => {
	return jwt.sign(payload, privateKey, options);
};

export const decode = async (
	token: string
): Promise<{ valid: boolean; expired: boolean; decoded: JwtPayload | string | null }> => {
	try {
		const decoded = jwt.verify(token, privateKey);
		return { valid: true, expired: false, decoded };
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === 'jwt expired',
			decoded: null,
		};
	}
};
