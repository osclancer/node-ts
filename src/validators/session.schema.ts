import { object, string } from "yup";

export const createSessionSchema = object({
    body: object({
        email: string().required('Email is required').email(),
        password: string().required('Password is required')
    })
});