import React from 'react';
import type { ClientApi } from '@client/Api';
import type { StoreController } from '@client/Store';
import { GeocoderStepper } from './GeocoderStepper';
import { AppContainer, FormCard, IntroCard, PresentationCard, SelectionCard, Stepper } from './components';

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
    IntroCard: IntroCard;
    SelectionCard: SelectionCard;
    FormCard: FormCard;
    PresentationCard: PresentationCard;
    Stepper: Stepper;
    GeocoderStepper: BaseConfig;
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
            IntroCard,
            SelectionCard,
            FormCard,
            PresentationCard,
            Stepper,
            GeocoderStepper
        };

        return (
            <store.Provider value={store.getStore()}>
                <AppContainer app={app} />
            </store.Provider>
        );
    }
};

