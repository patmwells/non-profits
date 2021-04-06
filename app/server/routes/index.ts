import { Router } from 'express';
import type { ServerConfig } from '../types';
import {
    onFaviconRequest,
    onGeocoderConfigRequest,
    onRenderViewRequest
} from './controllers';

/**
 *
 */
export function getFaviconRouter(server: ServerConfig): Router {
    const router = Router();

    router.get(server.serverRoutes.favicon, onFaviconRequest);

    return router;
}

/**
 *
 */
export function getCensusRouter(server: ServerConfig): Router {
    const router = Router();

    router.get(server.apiRoutes.geocoderConfigs, onGeocoderConfigRequest);

    return router;
}

/**
 *
 */
export function getViewRouter(server: ServerConfig): Router {
    const router = Router();

    router.get(server.serverRoutes.view, onRenderViewRequest);

    return router;
}
