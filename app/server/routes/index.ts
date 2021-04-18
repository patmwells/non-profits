import { Router } from 'express';
import {
    onFaviconRequest,
    onGeocoderConfigRequest,
    onGeocoderSubmissionRequest,
    onRenderViewRequest
} from './controllers';

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
    submitGeocoder: string;
}

/**
 *
 */
export const apiRoutes = {
    geocoderConfigs: '/api/v1/census/geocoder/configs',
    submitGeocoder: '/api/v1/census/geocoder/submit'
};

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
    router.post(apiRoutes.submitGeocoder, onGeocoderSubmissionRequest);

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
