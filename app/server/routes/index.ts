import { Router } from 'express';
import {
    onFaviconRequest,
    onGeocoderConfigRequest,
    onRenderViewRequest
} from './controllers';

/**
 *
 */
export function getFaviconRouter(): Router {
    const router = Router();

    router.get('/favicon.ico', onFaviconRequest);

    return router;
}

/**
 *
 */
export function getCensusRouter(): Router {
    const router = Router();

    router.get('/census/geocoder/configs', onGeocoderConfigRequest);

    return router;
}

/**
 *
 */
export function getViewRouter(): Router {
    const router = Router();

    router.get('/*', onRenderViewRequest);

    return router;
}
