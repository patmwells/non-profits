import type { StoreController } from '../Store';
import type { Controller } from './Common';
import type { StepperController } from './Stepper';
import { App } from './App';
import { Common } from './Common';
import { createIntroCard } from './IntroCard';
import { createSelectionCard } from './SelectionCard';
import { createStepper } from './Stepper';

/**
 *
 */
export type createApp = typeof createApp;

/**
 *
 */
export interface AppController extends Controller<App> {
    store: StoreController;
    common: Common;
    getViewController: typeof getViewController;
    createIntroCard: createIntroCard;
    createSelectionCard: createSelectionCard;
    createStepper: createStepper;
}

/**
 *
 * @param controller
 */
function getViewController(controller: AppController): StepperController {
    const steps = [controller.createIntroCard, controller.createSelectionCard];

   return controller.createStepper(controller, { steps });
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
        getViewController,
        createIntroCard,
        createSelectionCard,
        createStepper
    };
}

