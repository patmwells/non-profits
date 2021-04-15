import React, { useState } from 'react';
import type { AppController } from '../index';
import type { BaseController } from '../Common';
import { Step, StepOptions, Stepper, Steps } from './Stepper';

/**
 *
 * @param steps
 */
function useCurrentStep(steps: Steps): { step: Step; options: StepOptions } {
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
    
    return {
        step: steps[step],
        options
    };
}

/**
 *
 */
interface ComponentProps {
    app: AppController;
    steps: Steps;
}

/**
 *
 * @param app
 * @param steps
 * @constructor
 */
function Component({ app, steps }: ComponentProps): JSX.Element {
    return <Stepper app={app} steps={steps} controller={StepperController} />;
}

/**
 *
 */
export interface StepperController extends BaseController<ComponentProps> {
    viewHeader: string;
    useCurrentStep: typeof useCurrentStep;
}

/**
 *
 */
export const StepperController: StepperController = {
    Component,
    viewHeader: 'Stepper',
    useCurrentStep
};
