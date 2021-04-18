import type { Request, Response } from 'express';
import type { ServerConfig } from '../server';

/**
 *
 */
export type onFaviconRequest = typeof onFaviconRequest;
export type onGeocoderConfigRequest = typeof onGeocoderConfigRequest;
export type onGeocoderSubmissionRequest = typeof onGeocoderSubmissionRequest;
export type onRenderViewRequest = typeof onRenderViewRequest;

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
    const configs = server.getGeocoderConfigs();

    res.status(200);
    res.send(configs);
    res.end();
}

/**
 *
 * @param req
 * @param res
 */
export function onGeocoderSubmissionRequest(req: Request, res: Response): void {
    const server = getServer(req);
    server.submitGeocoder(req.body);

    res.status(200);
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
