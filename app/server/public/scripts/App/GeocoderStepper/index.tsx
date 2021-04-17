import React, { useReducer } from 'react';
import type { AppConfig } from '@client/App';
import type { GeocoderConfigState, StoreController } from '@client/Store';
import type { Form } from '@client/App/components/FormCard';
import type { StepperOptions } from '@client/App/components/Stepper';
import { FormActions, formReducer, getInitialFormState } from './state';

/**
 *
 */
interface StepComponentProps {
    app: AppConfig;
    stepper: StepperOptions;
}

/**
 *
 */
const IntroCardStep = {
    viewHeader: 'We provide tools to help you match data',
    headerText: 'Census Information',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat erat aliquam vel nibh sed ornare convallis aliquam.',
    buttonText: 'Explore',
    Component({ app, stepper }: StepComponentProps): JSX.Element {
        return <app.IntroCard options={stepper} config={IntroCardStep} />;
    },
    onClick(stepper: StepperOptions): void {
        stepper.next();
    }
};

/**
 *
 */
const ReturnTypeStep = {
    viewHeader: 'Return Type',
    secondaryButtonText: 'Back',
    Component({ app, stepper }: StepComponentProps): JSX.Element {
        return <app.SelectionCard app={app} options={stepper} config={ReturnTypeStep} />;
    },
    useSelections({ store }: AppConfig): string[] {
        const configs = store.useSelector(store.selectGeocoderConfigs);

        return configs.returnTypes;
    },
    onSelection(stepper: StepperOptions, selection: string): void {
        stepper.setState('returnType', selection);
        stepper.next();
    },
    onSecondaryClick(stepper: StepperOptions): void {
        stepper.setState('returnType', null);
        stepper.previous();
    }
};

/**
 *
 */
const SearchTypeStep = {
    viewHeader: 'Search Type',
    secondaryButtonText: 'Back',
    Component({ app, stepper }: StepComponentProps): JSX.Element {
        return <app.SelectionCard app={app} options={stepper} config={SearchTypeStep} />;
    },
    useSelections({ store }: AppConfig, stepper: StepperOptions): string[] {
        const configs = store.useSelector(store.selectGeocoderConfigs);
        const returnType = stepper.getState<string>('returnType');

        return configs.returnTypeConfigs[returnType].searchTypes;
    },
    onSelection(stepper: StepperOptions, selection: string): void {
        stepper.setState('searchType', selection);
        stepper.next();
    },
    onSecondaryClick(stepper: StepperOptions): void {
        stepper.setState('searchType', null);
        stepper.previous();
    }
};

/**
 *
 */
const SearchConfigTypeStep = {
    viewHeader: 'Search Config Type',
    submitButtonText: 'Submit',
    secondaryButtonText: 'Back',
    Component({ app, stepper }: StepComponentProps): JSX.Element {
        return <app.FormCard app={app} options={stepper} config={SearchConfigTypeStep} />;
    },
    useForm({ store }: AppConfig, stepper: StepperOptions): Form {
        const configs = store.useSelector(store.selectGeocoderConfigs);
        const returnType = stepper.getState<string>('returnType');
        const searchType = stepper.getState<string>('searchType');
        const searchTypeConfigs = configs.returnTypeConfigs[returnType].searchTypeConfigs[searchType];
        const [{ fields }, dispatch] = useReducer(formReducer, getInitialFormState(searchTypeConfigs));

        return {
            fields,
            onChange: function (name, value): void {
                dispatch({ type: FormActions.change, name, value });
            },
            onSubmit: function (): void {
                stepper.setState('configType', fields);
                stepper.next();
            }
        };
    },
    onSecondaryClick(stepper: StepperOptions): void {
        stepper.setState('configType', null);
        stepper.previous();
    }
};

/**
 *
 */
const DoneCardStep = {
    viewHeader: 'Done!!',
    headerText: '',
    bodyText: '',
    buttonText: 'Done',
    Component({ app, stepper }: StepComponentProps): JSX.Element {
        return <app.IntroCard options={stepper} config={DoneCardStep} />;
    },
    onClick(stepper: StepperOptions): void {
        stepper.complete();
    }
};

/**
 *
 */
export const GeocoderStepper = {
    steps: [
        IntroCardStep,
        ReturnTypeStep,
        SearchTypeStep,
        SearchConfigTypeStep,
        DoneCardStep
    ],
    viewHeader: 'Stepper',
    Component({ app }: { app: AppConfig }): JSX.Element {
        const { store } = app;

        return (
            <store.AsyncDataLoader store={store} config={GeocoderStepper}>
                <app.Stepper app={app} config={GeocoderStepper} />
            </store.AsyncDataLoader>
        );
    },
    useAsyncData(store: StoreController): GeocoderConfigState {
        return store.useGeocoderConfigs(store);
    }
};

