import React from 'react';
import type { AppConfig, BaseConfig } from '@client/App';

/**
 *
 */
export type Stepper = typeof Stepper;

/**
 *
 */
interface CurrentStep {
    step: Step;
    next: (...args) => void;
    previous: (...args) => void;
}

/**
 *
 */
type Step = BaseConfig<{ app: AppConfig; options: CurrentStep }>;

/**
 *
 */
interface StepperConfig {
    useCurrentStep: (config: StepperConfig) => CurrentStep;
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
    const current = config.useCurrentStep(config);

    return <current.step.Component app={app} options={current} />;
}
