import type { ClientApi } from '../Api';
import type { Controller } from '../Common';
import type { StepperController } from '../Stepper';
import { App } from './App';
import { Store } from '../Store';
import { Common } from '../Common';
import { createIntroCard } from '../IntroCard';
import { createSelectionCard } from '../SelectionCard';
import { createStepper } from '../Stepper';

/**
 *
 */
export type createApp = typeof createApp;

/**
 *
 */
export interface AppController extends Controller<App> {
    api: ClientApi;
    store: Store;
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
 * @param api
 */
export function createApp(api: ClientApi): AppController {
    return {
        api,
        store: Store,
        common: Common,
        Component: App,
        getViewController,
        createIntroCard,
        createSelectionCard,
        createStepper
    };
}

