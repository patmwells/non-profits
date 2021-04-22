import React, { FormEvent, SyntheticEvent, useState } from 'react';
import type { AppConfig, BaseConfig } from '@client/App';
import type { StepperOptions, FormField } from '@client/App/components';
import { Card, Form, Stepper, SelectionOptions } from '../components';


/**
 *
 */
interface GeocoderStepperProps {
    app: AppConfig;
    steps: BaseConfig<{ app: AppConfig; stepper: StepperOptions }>[];
}

/**
 *
 * @param app
 * @param steps
 */
export function GeocoderStepper({ app, steps }: GeocoderStepperProps): JSX.Element {
    return (
        <Stepper
            steps={steps}
            render={function (stepper): JSX.Element {
                return <stepper.step.Component app={app} stepper={stepper} />;
            }}
        />
    );
}

/**
 *
 */
interface IntroProps {
    config: {
        headerText: string;
        bodyText: string;
        buttonText: string;
        onClick: (stepper: StepperOptions) => void;
    };
    stepper: StepperOptions;
}

/**
 *
 * @param stepper
 * @param config
 */
export function Intro({ stepper, config }: IntroProps): JSX.Element {
    const { headerText, bodyText, buttonText, onClick } = config;

    /**
     *
     */
    function handleOnClick(): void {
        onClick(stepper);
    }

    return (
        <Card
            headerText={headerText}
            primaryButtonText={buttonText}
            onPrimaryClick={handleOnClick}
        >
            <span>{bodyText}</span>
        </Card>
    );
}

/**
 *
 */
interface SelectionProps {
    app: AppConfig;
    stepper: StepperOptions;
    config: {
        onSecondaryClick: (stepper: StepperOptions) => void;
        secondaryButtonText: string;
        useSelections: (app: AppConfig, stepper: StepperOptions) => string[];
        onSelection: (stepper: StepperOptions, selection: string) => void;
    };
}

/**
 *
 * @param app
 * @param stepper
 * @param config
 */
export function Selection({ app, stepper, config }: SelectionProps): JSX.Element {
    const selections = config.useSelections(app, stepper);
    const { onSecondaryClick, secondaryButtonText, onSelection } = config;

    /**
     *
     */
    function handleSecondaryClick(): void {
        onSecondaryClick(stepper);
    }

    /**
     *
     * @param event
     */
    function handleSelection(event: SyntheticEvent<HTMLInputElement>): void {
        onSelection(stepper, event.currentTarget.value);
    }

    return (
        <Card secondaryButtonText={secondaryButtonText} onSecondaryClick={handleSecondaryClick}>
            {selections.map((selection, index) => {
                return (
                    <SelectionOptions key={index} value={selection} onClick={handleSelection}>
                        {selection}
                    </SelectionOptions>
                );
            })}
        </Card>
    );
}

/**
 *
 */
interface FormCardProps {
    app: AppConfig;
    stepper: StepperOptions;
    config: {
        submittingText: string;
        submitButtonText: string;
        onSecondaryClick: (stepper: StepperOptions) => void;
        secondaryButtonText: string;
        useFormFields: (app: AppConfig, stepper: StepperOptions) => FormField[];
        onSubmit: (stepper: StepperOptions, fields: FormField[]) => void;
    };
}

/**
 *
 * @param app
 * @param config
 * @param stepper
 */
export function FormCard({ app, config, stepper }: FormCardProps): JSX.Element {
    const fields = config.useFormFields(app, stepper);
    const { submitButtonText, secondaryButtonText } = config;

    /**
     *
     * @param event
     * @param fields
     */
    function onSubmit(event: FormEvent, fields: FormField[]): void {
        config.onSubmit(stepper, fields);
    }

    /**
     *
     */
    function onSecondaryClick(): void {
        config.onSecondaryClick(stepper);
    }

    return (
        <Form
            fields={fields}
            onSubmit={onSubmit}
            render={function ({ fields, handleSubmit }): JSX.Element {
                return (
                    <Card
                        primaryButtonText={submitButtonText}
                        onPrimaryClick={handleSubmit}
                        secondaryButtonText={secondaryButtonText}
                        onSecondaryClick={onSecondaryClick}
                    >
                        {fields}
                    </Card>
                );
            }}
        />
    );
}

/**
 *
 */
interface PresentationProps {
    app: AppConfig;
    stepper: StepperOptions;
    children: JSX.Element | JSX.Element[];
    config: {
        headerText: string;
        loadingText: string;
        handlePrimaryClick: (app: AppConfig, stepper: StepperOptions) => Promise<void> | void;
        primaryButtonText: string;
        handleSecondaryClick: (stepper: StepperOptions) => void;
        secondaryButtonText: string;
    };
}

/**
 *
 * @param app
 * @param config
 * @param stepper
 * @param children
 */
export function Presentation({ app, config, stepper, children }: PresentationProps): JSX.Element {
    const [loading, setIsLoading] = useState(false);
    const { headerText, loadingText, primaryButtonText, secondaryButtonText } = config;

    /**
     *
     */
    async function handlePrimaryClick(): Promise<void> {
        setIsLoading(true);
        await config.handlePrimaryClick(app, stepper);
    }

    /**
     *
     */
    function handleSecondaryClick(): void {
        config.handleSecondaryClick(stepper);
    }

    return (
        <Card
            headerText={headerText}
            onPrimaryClick={handlePrimaryClick}
            primaryButtonText={loading ? loadingText : primaryButtonText}
            onSecondaryClick={handleSecondaryClick}
            secondaryButtonText={secondaryButtonText}
        >
            {children}
        </Card>
    );
}
