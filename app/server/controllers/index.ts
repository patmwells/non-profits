import type { Request, Response } from 'express';
import { getServerConfig } from '../server';

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
    const server = getServerConfig(req);
    const html = server.getPageHTML(server);

    res.status(200);
    res.write(html);
    res.end();
}