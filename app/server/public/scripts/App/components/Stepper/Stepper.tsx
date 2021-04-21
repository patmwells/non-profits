import React from 'react';
import type { AppConfig, BaseConfig } from '@client/App';
import { StepperOptions, useStepper } from './state';

/**
 *
 */
type Step = BaseConfig<{ app: AppConfig; stepper: StepperOptions }>;

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
export interface Stepper {
    (props: StepperProps): JSX.Element;
}

/**
 *
 */
export function Stepper({ app, config }: StepperProps): JSX.Element {
    const stepper = useStepper(config.steps);

    return <stepper.step.Component app={app} stepper={stepper} />;
}
