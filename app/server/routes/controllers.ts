import type { Request, Response } from 'express';
import type { ServerConfig } from '../server';

/**
 *
 * @param req
 */
function getServer(req: Request): ServerConfig {
    return req.app.locals.server;
}

/**
 *
 * @param req
 * @param res
 */
export function onFaviconRequest(req: Request, res: Response): void {
    res.status(404);
    res.end();
}

/**
 *
 * @param req
 * @param res
 */
export function onGeocoderConfigRequest(req: Request, res: Response): void {
    const server = getServer(req);
    const configs = server.CensusGeocoder.getConfigs();

    res.status(200);
    res.send(configs);
    res.end();
}

/**
 *
 * @param req
 * @param res
 */
export async function onGeocoderSubmissionRequest(req: Request, res: Response): Promise<void> {
    const server = getServer(req);
    const data = await server.CensusGeocoder.submitRequest(server, req.body);

    res.status(200);
    res.send(data);
    res.end();
}

/**
 *
 * @param req
 * @param res
 */
export function onRenderViewRequest(req: Request, res: Response): void {
    const server = getServer(req);
    const html = server.getClientView(server);

    res.status(200);
    res.write(html);
    res.end();
}
