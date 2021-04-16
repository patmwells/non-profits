import React from 'react';
import type { StyledComponent } from 'styled-components';
import type { StoreController } from '@client/Store';
import { GeocoderStepper } from './GeocoderStepper';
import {
    Body,
    Card,
    Container,
    Header,
    IntroCard,
    PrimaryButton,
    SelectionCard,
    Stepper,
    View,
    ViewHeader
} from './components';

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
    Body: StyledComponent;
    Card: StyledComponent;
    Container: StyledComponent;
    Header: StyledComponent;
    PrimaryButton: StyledComponent;
    View: StyledComponent;
    ViewHeader: StyledComponent;
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
            View,
            ViewHeader,
            Card,
            Container,
            Header,
            Body,
            PrimaryButton,
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

