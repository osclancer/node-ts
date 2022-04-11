import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import { ValidationError } from '@thefeqyorg/error-handlers';
import fs from 'fs';

const validateRequest =
	(schema: AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		await schema
			.validate(
				{
					body: req.body,
					file: req.file,
					files: req.files,
					params: req.params,
					query: req.query,
				},
				{ abortEarly: false }
			)
			.then(() => next())
			.catch((error) => {
				if (req.file) fs.unlinkSync(req.file.path);

				next(new ValidationError(error));
			});
	};

export default validateRequest;
