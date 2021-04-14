import React from 'react';
import type { BaseProps } from '../Common';
import type { StepperController } from './index';

/**
 *
 */
export type Stepper = typeof Stepper;

/**
 *
 */
export function Stepper({ controller }: BaseProps<StepperController>): JSX.Element {
    const step = controller.useCurrentStep(controller);

    return <step.Component controller={step} />;
}
