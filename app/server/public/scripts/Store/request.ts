import { useEffect } from 'react';
import type { ClientApi, GeocoderConfig } from '../Api';
import { AsyncStatus } from './AsyncDataLoader';
import { Actions, State, useStore } from './store';

/**
 *
 */
export type useDataRequest = typeof useDataRequest;
export type createRequests = typeof createRequests;

/**
 *
 */
export interface Requests {
    geocoderConfigs: () => GeocoderDataRequest;
}

/**
 *
 */
interface DataRequest<T> {
    type: Actions;
    request: () => Promise<T>;
}

/**
 *
 * @param type
 * @param request
 */
export function useDataRequest<T>({ type, request }: DataRequest<T>): State<T> {
    const { state, dispatch } = useStore();
    const result = state[type] as State<T>;

    useEffect(() => {

        if (result.status) {
            return;
        }

        dispatch({ type, status: AsyncStatus.pending });

        request()
            .then(data => dispatch({
                type,
                status: AsyncStatus.success,
                data
            }))
            .catch((error) => dispatch({
                type,
                status: AsyncStatus.failed,
                error
            }));

    }, [result, dispatch, type, request]);

    return result;
}

/**
 *
 */
type GeocoderDataRequest = DataRequest<GeocoderConfig[]>;

/**
 *
 * @param api
 */
export function createRequests(api: ClientApi): Requests {
    return {
        geocoderConfigs: function (): GeocoderDataRequest {
            return {
                type: Actions.FETCH_GEOCODER_CONFIGS,
                request: (): Promise<GeocoderConfig[]> => api.getGeocoderConfigs()
            };
        }
    };
}
