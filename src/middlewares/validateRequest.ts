import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import ValidationError from '../errors/validationError';

const validateRequest =
	(schema: AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {		
		await schema
			.validate(
				{
					body: req.body,
					params: req.params,
					query: req.query,
				},
				{ abortEarly: false }
			)
			.then(() => next())
			.catch((error) => {
				next(new ValidationError(error))
			});
	};

export default validateRequest;
