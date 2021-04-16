import React from 'react';
import type { AppController, BaseController } from '@client/App';

/**
 *
 */
export type Stepper = typeof Stepper;

/**
 *
 */
type Step = BaseController<{ app: AppController; options: unknown }>;

/**
 *
 */
type Steps = Step[];

/**
 *
 */
interface StepperController {
    useCurrentStep: (steps: Steps) => { step: Step; options: unknown };
}

/**
 *
 */
interface StepperProps {
    controller: StepperController;
    app: AppController;
    steps: Steps;
}

/**
 *
 */
export function Stepper({ app, controller, steps }: StepperProps): JSX.Element {
    const { step, options } = controller.useCurrentStep(steps);

    return <step.Component app={app} options={options} />;
}
