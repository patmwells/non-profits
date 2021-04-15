import React from 'react';
import type { AppController } from '../index';
import type { BaseController } from '../Common';
import type { StepperController } from './index';

/**
 *
 */
export type Stepper = typeof Stepper;

/**
 *
 */
export interface StepOptions {
    next: () => void;
    previous: () => void;
}

/**
 *
 */
interface StepProps {
    app: AppController;
    options: StepOptions;
}

/**
 *
 */
export type Step = BaseController<StepProps>;

/**
 *
 */
export type Steps = Step[];

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
