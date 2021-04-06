import { Router } from 'express';
import {
    geocoderConfigHandler,
    handleFaviconRequest,
    renderViewHandler
} from './controllers';

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
 */
export function getCensusRouter(): Router {
    const router = Router();

    router.get('/census/geocoder/configs', geocoderConfigHandler);

    return router;
}

/**
 *
 */
export function getViewRouter(): Router {
    const router = Router();

    router.get('/*', renderViewHandler);

    return router;
}
