import React, { useState } from 'react';
import type { AppController, BaseController } from '@client/App';
import type { GeocoderConfigState, StoreController } from '@client/Store';

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
interface StepComponentProps {
    app: AppController;
    options: StepOptions;
}

/**
 *
 */
type Step = BaseController<StepComponentProps>;

/**
 *
 */
type Steps = Step[];

/**
 *
 */
export const GeocoderStepper = {
    viewHeader: 'Stepper',
    Component({ app }: { app: AppController }): JSX.Element {
        const steps = [
            IntroCardStep,
            ReturnTypeStep
        ];

        return <app.Stepper app={app} steps={steps} controller={GeocoderStepper} />;
    },
    useCurrentStep(steps: Steps): { step: Step; options: StepOptions } {
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
};

/**
 *
 */
const IntroCardStep = {
    viewHeader: 'We provide tools to help you match data',
    headerText: 'Census Information',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat erat aliquam vel nibh sed ornare convallis aliquam.',
    buttonText: 'Explore',
    Component({ app, options }: StepComponentProps): JSX.Element {
        return <app.IntroCard app={app} options={options} controller={IntroCardStep} />;
    },
    onClick(options: StepOptions): void {
        options.next();
    }
};

/**
 *
 */
const ReturnTypeStep = {
    viewHeader: 'SelectionCard',
    primaryButtonText: 'Primary',
    secondaryButtonText: 'Secondary',
    Component({ app, options }: StepComponentProps): JSX.Element {
        return <app.SelectionCard app={app} options={options} controller={ReturnTypeStep} />;
    },
    useAsyncData(store: StoreController): GeocoderConfigState {
        return store.useGeocoderConfigs(store);
    },
    onPrimaryClick(options: StepOptions): void {
        options.next();
    },
    onSecondaryClick(options: StepOptions): void {
        options.previous();
    }
};

