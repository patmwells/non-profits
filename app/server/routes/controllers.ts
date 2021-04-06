import type { Request, Response, Handler } from 'express';
import type { ServerConfig } from '../types';

/**
 *
 * @param req
 * @param res
 */
export function handleFaviconRequest(req: Request, res: Response): void {
    res.status(404);
    res.end();
}

/**
 *
 * @param server
 */
export function getRenderViewHandler(server: ServerConfig) {

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

/**
 *
 * @param server
 */
export function getGeocoderConfigHandler(server: ServerConfig): Handler {

    /**
     *
     * @param req
     * @param res
     */
    return function (req: Request, res: Response) {
        const configs = server.getGeocoderConfigs();

        res.status(200);
        res.send(configs);
        res.end();
    };
}