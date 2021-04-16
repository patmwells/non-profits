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
interface StepperConfig {
    useCurrentStep: (config: StepperConfig) => { step: Step; options: unknown };
}

/**
 *
 */
interface StepperProps {
    config: StepperConfig;
    app: AppController;
}

/**
 *
 */
export function Stepper({ app, config }: StepperProps): JSX.Element {
    const { step, options } = config.useCurrentStep(config);

    return <step.Component app={app} options={options} />;
}
