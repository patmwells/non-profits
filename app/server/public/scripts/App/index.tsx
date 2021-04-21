import React from 'react';
import type { ClientApi } from '@client/Api';
import type { StoreController } from '@client/Store';
import { AppContainer } from './components';
import { GeocoderStepperConfig } from './GeocoderStepper';

/**
 *
 */
export interface BaseConfig<T = { app: AppConfig }> {
    Component: (props: T) => JSX.Element;
}

/**
 *
 */
export interface AppConfig {
    api: ClientApi;
    store: StoreController;
    GeocoderStepperConfig: BaseConfig;
}

/**
 *
 */
interface AppProps {
    api: ClientApi;
    store: StoreController;
}

/**
 *
 */
export type App = BaseConfig<AppProps>;

/**
 *
 */
export const App: App = {
    Component({ api, store }: AppProps): JSX.Element {
        const app: AppConfig = {
            api,
            store,
            GeocoderStepperConfig
        };

        return (
            <store.Provider value={store.getStore()}>
                <AppContainer app={app} />
            </store.Provider>
        );
    }
};

