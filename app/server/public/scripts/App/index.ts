import type { StyledComponent } from 'styled-components';
import type { StoreController } from '../Store';
import { App } from './App';
import { IntroCardController } from './IntroCard';
import { SelectionCardController } from './SelectionCard';
import { StepperController } from './Stepper';
import { Body, Card, Container, Header, PrimaryButton, View, ViewHeader } from './components';

/**
 *
 */
export type createApp = typeof createApp;

/**
 *
 */
export interface AppController {
    store: StoreController;
    Component: App;
    Body: StyledComponent;
    Card: StyledComponent;
    Container: StyledComponent;
    Header: StyledComponent;
    PrimaryButton: StyledComponent;
    View: StyledComponent;
    ViewHeader: StyledComponent;
    IntroCardController: IntroCardController;
    SelectionCardController: SelectionCardController;
    StepperController: StepperController;
}

/**
 *
 * @param store
 */
export function createApp(store: StoreController): AppController {
    return {
        store,
        Component: App,
        View,
        ViewHeader,
        Card,
        Container,
        Header,
        Body,
        PrimaryButton,
        IntroCardController,
        SelectionCardController,
        StepperController
    };
}

