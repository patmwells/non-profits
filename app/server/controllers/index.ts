import { Request, Response } from 'express';
import { getAppConfig } from '../config';
import { getPageHTML } from '../view';

/**
 *
 * @param req
 * @param res
 */
export function favicon(req: Request, res: Response): void {
    res.status(404);
    res.end();
}

/**
 *
 * @param req
 * @param res
 */
export function render(req: Request, res: Response): void {
    const config = getAppConfig(res);
    const html = getPageHTML(config);

    res.status(200);
    res.write(html);
    res.end();
}