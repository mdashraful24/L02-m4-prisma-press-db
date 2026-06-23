import { NextFunction, Request, Response } from "express";

export type TTypeController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>
