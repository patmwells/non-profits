import { useState } from 'react';
import type { AppController } from '../App';
import type { Controller, Common } from '../Common';
import { Stepper } from './Stepper';

/**
 *
 */
export type createStepper = typeof createStepper;

/**
 *
 */
export interface StepperController extends Controller<Stepper> {
    app: AppController;
    common: Common;
    viewHeader: string;
    steps: Step[];
    useCurrentStep: typeof useCurrentStep;
}

/**
 *
 * @param app
 * @param steps
 */
function useCurrentStep({ app, steps }: StepperController): Controller {
    const [step, setCurrentStep] = useState(0);
    const options = {
        next: (): void => {
            const nextStep = step + 1;

            if (nextStep <= (steps.length - 1)) {
                setCurrentStep(nextStep);
            }
        },
        previous: (): void => {
            const previousStep = step - 1;

            if (previousStep >= 0) {
                setCurrentStep(previousStep);
            }
        }
    };
    const controllers = steps.map(createController => createController(app, options));
    
    return controllers[step];
}

/**
 *
 */
interface StepOptions {
    next: () => void;
    previous: () => void;
}

/**
 *
 */
interface Step {
    (controller: AppController, options: StepOptions): Controller;
}

/**
 *
 */
interface Options {
    steps: Step[];
}

/**
 *
 * @param app
 * @param steps
 */
export function createStepper(app: AppController, { steps }: Options): StepperController {
    const { common } = app;

    return {
        app,
        common,
        Component: Stepper,
        viewHeader: 'Stepper',
        steps,
        useCurrentStep
    };
}
