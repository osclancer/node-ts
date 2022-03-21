import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/notFoundError";

export default (req: Request, res: Response, next: NextFunction) => {
    return next(new NotFoundError("Error 404 | Not Found"));
};