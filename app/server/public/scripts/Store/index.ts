import type { Provider } from 'react';
import type { ClientApi, GeocoderConfig } from '@client/Api';
import type { State, StoreInterface, StoreState } from './store';
import type { DataRequest } from './request';
import { StoreProvider, getStore, Actions, useSelector } from './store';
import { AsyncDataLoader } from './AsyncDataLoader';
import { useDataRequest } from './request';

/**
 *
 */
export type { State } from './store';
export type GeocoderConfigState = State<GeocoderConfig>;
export type createStore = typeof createStore;

/**
 *
 */
export interface StoreController {
    Provider: Provider<StoreInterface>;
    AsyncDataLoader: AsyncDataLoader;
    getStore: getStore;
    useSelector: useSelector;
    useGeocoderConfigs: typeof useGeocoderConfigs;
    selectGeocoderConfigs: typeof selectGeocoderConfigs;
    requests: {
        geocoderConfigs: () => DataRequest<GeocoderConfig>;
    };
}

/**
 *
 * @param state
 */
function selectGeocoderConfigs(state: StoreState): GeocoderConfig {
    return state[Actions.FETCH_GEOCODER_CONFIGS].data as GeocoderConfig;
}

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
        useSelector,
        useGeocoderConfigs,
        selectGeocoderConfigs,

        /**
         *
         */
        requests: {
            geocoderConfigs: function (): DataRequest<GeocoderConfig> {
                return {
                    type: Actions.FETCH_GEOCODER_CONFIGS,
                    request: (): Promise<GeocoderConfig> => api.getGeocoderConfigs()
                };
            }
        }
    };
}
