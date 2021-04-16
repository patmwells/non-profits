import React, { useReducer } from 'react';
import type { AppConfig, BaseConfig } from '@client/App';
import type { GeocoderConfigState, StoreController } from '@client/Store';
import type { Form } from '@client/App/components/FormCard';
import {
    Actions,
    getInitialState,
    stepperReducer,
    Stepper,
    FormActions,
    formReducer,
    getInitialFormState
} from './state';

/**
 *
 */
interface StepOptions {
    step: Step;
    state: Stepper;
    next: (name: string, value?: string | { label: string; name: string; value: string }[]) => void;
    previous: (name: string) => void;
    complete: () => void;
}

/**
 *
 */
interface StepComponentProps {
    app: AppConfig;
    options: StepOptions;
}

/**
 *
 */
type Step = BaseConfig<StepComponentProps>;

/**
 *
 */
type Steps = Step[];

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
    onClick(options: StepOptions): void {
        options.next('intro');
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
    onSelection(options: StepOptions, selection: string): void {
        options.next('returnType', selection);
    },
    onSecondaryClick(options: StepOptions): void {
        options.previous('returnType');
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
    useSelections({ store }: AppConfig, { state }: StepOptions): string[] {
        const configs = store.useSelector(store.selectGeocoderConfigs);

        return configs.returnTypeConfigs[state.returnType].searchTypes;
    },
    onSelection(options: StepOptions, selection: string): void {
        options.next('searchType', selection);
    },
    onSecondaryClick(options: StepOptions): void {
        options.previous('searchType');
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
    useForm({ store }: AppConfig, options: StepOptions): Form {
        const { state } = options;
        const configs = store.useSelector(store.selectGeocoderConfigs);
        const searchTypeConfigs = configs.returnTypeConfigs[state.returnType].searchTypeConfigs[state.searchType];
        const [{ fields }, dispatch] = useReducer(formReducer, getInitialFormState(searchTypeConfigs));

        return {
            fields,
            onChange: function (name, value): void {
                dispatch({ type: FormActions.change, name, value });
            },
            onSubmit: function (): void {
                options.next('configType', fields);
            }
        };
    },
    onSecondaryClick(options: StepOptions): void {
        options.previous('configType');
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
    onClick(options: StepOptions): void {
        options.complete();
    }
};

/**
 *
 */
interface GeocoderStepper {
    steps: Steps;
    viewHeader: string;
    Component: ({ app: AppController }) => JSX.Element;
    useAsyncData: (store: StoreController) => GeocoderConfigState;
    useCurrentStep: (config: GeocoderStepper) => StepOptions;
}

/**
 *
 */
export const GeocoderStepper: GeocoderStepper = {
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
    },
    useCurrentStep({ steps }: GeocoderStepper): StepOptions {
        const [state, dispatch] = useReducer(stepperReducer, getInitialState(steps));
        const step = steps[state.currentStep];

        return {
            step,
            state,
            next: (name: string, value: string | { label: string; name: string; value: string }[]): void => {
                dispatch({ type: Actions.next, name, value });
            },
            previous: (name: string): void => {
                dispatch({ type: Actions.previous, name });
            },
            complete: (): void => {
                dispatch({ type: Actions.complete });
            }
        };
    }
};

