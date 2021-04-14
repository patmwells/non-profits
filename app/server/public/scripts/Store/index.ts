import type { Provider } from 'react';
import type { ClientApi, GeocoderConfigs } from '../Api/types';
import type { State, StoreInterface } from './store';
import type { DataRequest } from './request';
import { StoreProvider, getStore, Actions } from './store';
import { AsyncDataLoader } from './AsyncDataLoader';
import { useDataRequest } from './request';

/**
 *
 */
export type createStore = typeof createStore;

/**
 *
 */
export interface StoreController {
    Provider: Provider<StoreInterface>;
    AsyncDataLoader: AsyncDataLoader;
    getStore: getStore;
    useGeocoderConfigs: typeof useGeocoderConfigs;
    requests: {
        geocoderConfigs: () => DataRequest<GeocoderConfigs>;
    };
}

/**
 *
 */
export type GeocoderConfigState = State<GeocoderConfigs>;

/**
 *
 * @param store
 */
function useGeocoderConfigs(store: StoreController): GeocoderConfigState {
    const request = store.requests.geocoderConfigs();

    return useDataRequest(request);
}

/**
 *
 * @param api
 */
export function createStore(api: ClientApi): StoreController {
    return {
        Provider: StoreProvider,
        AsyncDataLoader,
        getStore,
        useGeocoderConfigs,

        /**
         *
         */
        requests: {
            geocoderConfigs: function (): DataRequest<GeocoderConfigs> {
                return {
                    type: Actions.FETCH_GEOCODER_CONFIGS,
                    request: (): Promise<GeocoderConfigs> => api.getGeocoderConfigs()
                };
            }
        }
    };
}
