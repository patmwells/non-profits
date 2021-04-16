import React from 'react';
import type { StoreController } from '@client/Store';
import { GeocoderStepper } from './GeocoderStepper';
import { IntroCard, SelectionCard, Stepper } from './components';

/**
 *
 */
export interface BaseController<T = { app: AppController }> {
    Component: (props: T) => JSX.Element;
}

/**
 *
 */
export interface AppController {
    store: StoreController;
    IntroCard: IntroCard;
    SelectionCard: SelectionCard;
    Stepper: Stepper;
    GeocoderStepper: BaseController;
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
export type App = BaseController<AppProps>;

/**
 *
 */
export const App: App = {
    Component({ store }: AppProps): JSX.Element {
        const app: AppController = {
            store,
            IntroCard,
            SelectionCard,
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

