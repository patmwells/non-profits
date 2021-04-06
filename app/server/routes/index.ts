import { Router } from 'express';
import type { ServerConfig } from '../types';
import { getGeocoderConfigHandler, getRenderViewHandler, handleFaviconRequest } from './controllers';

/**
 *
 */
export function getFaviconRouter(): Router {
    const router = Router();

    router.get('/favicon.ico', handleFaviconRequest);

    return router;
}

/**
 *
 * @param server
 */
export function getCensusRouter(server: ServerConfig): Router {
    const router = Router();

    router.get('/census/geocoder/configs', getGeocoderConfigHandler(server));

    return router;
}

/**
 *
 * @param server
 */
export function getViewRouter(server: ServerConfig): Router {
    const router = Router();

    router.get('/*', getRenderViewHandler(server));

    return router;
}