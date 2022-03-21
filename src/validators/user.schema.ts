import { ref } from 'yup';
import { object, string } from 'yup';

export const createUserSchema = object({
	body: object({
		name: string().required('Name is required'),
		email: string().email('Invalid Email').required('Email is required'),
		password: string().required('Password is required'),
		passwordConfirmation: string()
			.required()
			.oneOf([ref('password')], "Password doesn't match"),
	}),
});
