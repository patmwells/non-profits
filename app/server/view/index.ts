import { Request, Response } from 'express';
import { getPageHTML } from './service';

/**
 *
 * @param req
 * @param res
 */
export function render(req: Request, res: Response): void {
    const html = getPageHTML(res.app.locals.config);

    res.status(200);
    res.write(html);
    res.end();
}