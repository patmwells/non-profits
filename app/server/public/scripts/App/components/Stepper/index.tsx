import React from 'react';
import type { AppConfig, BaseConfig } from '@client/App';
import { StepperOptions, useStepper } from './state';

/**
 *
 */
export { StepperOptions } from './state';

/**
 *
 */
export type Stepper = typeof Stepper;

/**
 *
 */
type Step = BaseConfig<{ app: AppConfig; options: StepperOptions }>;

/**
 *
 */
interface StepperConfig {
    steps: Step[];
}

/**
 *
 */
interface StepperProps {
    config: StepperConfig;
    app: AppConfig;
}

/**
 *
 */
export function Stepper({ app, config }: StepperProps): JSX.Element {
    const stepper = useStepper(config.steps);

    return <stepper.step.Component app={app} options={stepper} />;
}
