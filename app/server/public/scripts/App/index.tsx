import React from 'react';
import type { StoreController } from '@client/Store';
import { GeocoderStepper } from './GeocoderStepper';
import { FormCard, IntroCard, SelectionCard, Stepper } from './components';

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
    store: StoreController;
    IntroCard: IntroCard;
    SelectionCard: SelectionCard;
    FormCard: FormCard;
    Stepper: Stepper;
    GeocoderStepper: BaseConfig;
}

/**
 *
 */
interface AppProps {
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
    Component({ store }: AppProps): JSX.Element {
        const app: AppConfig = {
            store,
            IntroCard,
            SelectionCard,
            FormCard,
            Stepper,
            GeocoderStepper
        };

        return (
            <store.Provider value={store.getStore()}>
                <app.GeocoderStepper.Component app={app} />
            </store.Provider>
        );
    }
};

