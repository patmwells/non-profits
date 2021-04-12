import { Router } from 'express';
import { onFaviconRequest, onGeocoderConfigRequest, onRenderViewRequest } from './controllers';

/**
 *
 */
export type getFaviconRouter = typeof getFaviconRouter;
export type getCensusRouter = typeof getCensusRouter;
export type getViewRouter = typeof getViewRouter;


/**
 *
 */
export interface apiRoutes {
    geocoderConfigs: string;
}

export const apiRoutes = {
    geocoderConfigs: '/api/v1/census/geocoder/configs'
};

const serverRoutes = {
    favicon: '/favicon.ico',
    view: '*'
};

/**
 *
 */
export function getFaviconRouter(): Router {
    const router = Router();

    router.get(serverRoutes.favicon, onFaviconRequest);

    return router;
}

/**
 *
 */
export function getCensusRouter(): Router {
    const router = Router();

    router.get(apiRoutes.geocoderConfigs, onGeocoderConfigRequest);

    return router;
}

/**
 *
 */
export function getViewRouter(): Router {
    const router = Router();

    router.get(serverRoutes.view, onRenderViewRequest);

    return router;
}
