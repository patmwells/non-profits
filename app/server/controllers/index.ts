import type { Request, Response } from 'express';
import type { ServerConfig } from '../types';

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
 * @param server
 */
export function render(server: ServerConfig) {

    /**
     *
     * @param req
     * @param res
     */
    return function (req: Request, res: Response): void {
        const html = server.getPageHTML(server);

        res.status(200);
        res.write(html);
        res.end();
    };
}