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
    options: StepperOptions;
}

/**
 *
 */
const IntroCardStep = {
    viewHeader: 'We provide tools to help you match data',
    headerText: 'Census Information',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat erat aliquam vel nibh sed ornare convallis aliquam.',
    buttonText: 'Explore',
    Component({ app, options }: StepComponentProps): JSX.Element {
        return <app.IntroCard options={options} config={IntroCardStep} />;
    },
    onClick(options: StepperOptions): void {
        options.next();
    }
};

/**
 *
 */
const ReturnTypeStep = {
    viewHeader: 'Return Type',
    secondaryButtonText: 'Back',
    Component({ app, options }: StepComponentProps): JSX.Element {
        return <app.SelectionCard app={app} options={options} config={ReturnTypeStep} />;
    },
    useSelections({ store }: AppConfig): string[] {
        const configs = store.useSelector(store.selectGeocoderConfigs);

        return configs.returnTypes;
    },
    onSelection(options: StepperOptions, selection: string): void {
        options.setState('returnType', selection);
        options.next();
    },
    onSecondaryClick(options: StepperOptions): void {
        options.setState('returnType', null);
        options.previous();
    }
};

/**
 *
 */
const SearchTypeStep = {
    viewHeader: 'Search Type',
    secondaryButtonText: 'Back',
    Component({ app, options }: StepComponentProps): JSX.Element {
        return <app.SelectionCard app={app} options={options} config={SearchTypeStep} />;
    },
    useSelections({ store }: AppConfig, options: StepperOptions): string[] {
        const returnType = options.getState<string>('returnType');
        const configs = store.useSelector(store.selectGeocoderConfigs);

        return configs.returnTypeConfigs[returnType].searchTypes;
    },
    onSelection(options: StepperOptions, selection: string): void {
        options.setState('searchType', selection);
        options.next();
    },
    onSecondaryClick(options: StepperOptions): void {
        options.setState('searchType', null);
        options.previous();
    }
};

/**
 *
 */
const SearchConfigTypeStep = {
    viewHeader: 'Search Config Type',
    submitButtonText: 'Submit',
    secondaryButtonText: 'Back',
    Component({ app, options }: StepComponentProps): JSX.Element {
        return <app.FormCard app={app} options={options} config={SearchConfigTypeStep} />;
    },
    useForm({ store }: AppConfig, options: StepperOptions): Form {
        const returnType = options.getState<string>('returnType');
        const searchType = options.getState<string>('searchType');
        const configs = store.useSelector(store.selectGeocoderConfigs);
        const searchTypeConfigs = configs.returnTypeConfigs[returnType].searchTypeConfigs[searchType];
        const [{ fields }, dispatch] = useReducer(formReducer, getInitialFormState(searchTypeConfigs));

        return {
            fields,
            onChange: function (name, value): void {
                dispatch({ type: FormActions.change, name, value });
            },
            onSubmit: function (): void {
                options.setState('configType', fields);
                options.next();
            }
        };
    },
    onSecondaryClick(options: StepperOptions): void {
        options.setState('configType', null);
        options.previous();
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
    Component({ app, options }: StepComponentProps): JSX.Element {
        return <app.IntroCard options={options} config={DoneCardStep} />;
    },
    onClick(options: StepperOptions): void {
        options.complete();
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

