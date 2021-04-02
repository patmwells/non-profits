import { Request, Response } from 'express';

/**
 *
 * @param req
 * @param res
 */
export function favicon(req: Request, res: Response): void {
    res.status(404);
    res.end();
}