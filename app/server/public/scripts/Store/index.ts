import type { Provider } from 'react';
import type { ClientApi } from '../Api';
import type { State, StoreInterface } from './store';
import type { DataRequest } from './request';
import { AsyncDataLoader } from './AsyncDataLoader';
import { useDataRequest } from './request';
import { Actions, StoreProvider, getStore } from './store';

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
        geocoderConfigs: () => DataRequest;
    };
}

/**
 *
 * @param store
 */
function useGeocoderConfigs(store: StoreController): State {
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
            geocoderConfigs: function (): DataRequest {
                return {
                    type: Actions.FETCH_GEOCODER_CONFIGS,
                    request: (): Promise<unknown> => api.getGeocoderConfigs()
                };
            }
        }
    };
}
