import { UserPayload } from "./Documents";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}