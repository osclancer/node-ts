import jwt, { SignOptions, Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const privateKey = process.env.PRIVATE_KEY as string;

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
