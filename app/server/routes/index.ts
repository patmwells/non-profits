import { Router } from 'express';
import {
    onFaviconRequest,
    onGeocoderConfigRequest,
    onRenderViewRequest
} from './controllers';

/**
 *
 */
const serverRoutes = {
    favicon: '/favicon.ico',
    view: '*'
};

/**
 *
 */
export const apiRoutes = {
    geocoderConfigs: '/api/v1/census/geocoder/configs'
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
