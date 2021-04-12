import type { NextFunction, Request, Response } from 'express';

/**
 *
 */
export type logger = typeof logger;

/**
 *
 * @param options
 */
function log(options: unknown): void {
    const date = new Date();
    const timestamp = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}]`;

    console.log(timestamp, options);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
export function logger(req: Request, res: Response, next: NextFunction): void {
    log(req.url);
    next();
}
