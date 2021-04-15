import type { StoreController } from '../Store';
import { App } from './App';
import { Common } from './Common';
import { IntroCardController } from './IntroCard';
import { SelectionCardController } from './SelectionCard';
import { StepperController } from './Stepper';

/**
 *
 */
export type createApp = typeof createApp;

/**
 *
 */
export interface AppController {
    store: StoreController;
    common: Common;
    Component: App;
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
        common: Common,
        Component: App,
        IntroCardController,
        SelectionCardController,
        StepperController
    };
}

