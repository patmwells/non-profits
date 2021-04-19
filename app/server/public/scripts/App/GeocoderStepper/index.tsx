import React  from 'react';
import type { AppConfig } from '@client/App';
import type { GeocoderData } from '@client/Api';
import type { FormField, StepperOptions } from '@client/App/components';
import type { GeocoderConfigState, StoreController } from '@client/Store';

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
    submittingText: 'Submitting...',
    submitButtonText: 'Submit',
    secondaryButtonText: 'Back',
    Component({ app, stepper }: StepComponentProps): JSX.Element {
        return <app.FormCard app={app} options={stepper} config={SearchConfigTypeStep} />;
    },
    useFormFields({ store }: AppConfig, stepper: StepperOptions): FormField[] {
        const configs = store.useSelector(store.selectGeocoderConfigs);
        const returnType = stepper.getState<string>('returnType');
        const searchType = stepper.getState<string>('searchType');

        return configs
            .returnTypeConfigs[returnType]
            .searchTypeConfigs[searchType]
            .map((label) => ({ label, name: label, value: '' }));
    },
    onSubmit(stepper: StepperOptions, fields: FormField[]): void {
        stepper.setState('configType', fields);
        stepper.next();
    },
    onSecondaryClick(stepper: StepperOptions): void {
        stepper.setState('configType', null);
        stepper.previous();
    }
};

/**
 *
 */
const VerificationCardStep = {
    viewHeader: 'Verification',
    headerText: 'Is this information correct?',
    loadingText: 'Loading...',
    primaryButtonText: 'Yes!',
    secondaryButtonText: 'Back',
    Component({ app, stepper }: StepComponentProps): JSX.Element {
        const state = VerificationCardStep.getStepperState(stepper);

        return (
            <app.PresentationCard app={app} options={stepper} config={VerificationCardStep}>
                <hr />
                <div>ReturnType: {state.returnType}</div>
                <hr />
                <div>SearchType: {state.searchType}</div>
                <hr />
                <>{state.configType.map((field, index) => <div key={index}>{field.label}: {field.value}</div>)}</>
                <hr />
            </app.PresentationCard>
        );
    },
    getStepperState(stepper: StepperOptions): { returnType: string; searchType: string; configType: FormField[] } {
        return {
            returnType: stepper.getState<string>('returnType'),
            searchType: stepper.getState<string>('searchType'),
            configType: stepper.getState<FormField[]>('configType')
        };
    },
    async handlePrimaryClick(app: AppConfig, stepper: StepperOptions): Promise<void> {
        const options = VerificationCardStep.getStepperState(stepper);
        const data = await app.api.submitGeocoderRequest(options);
        stepper.setState('data', data);
        stepper.next();
    },
    handleSecondaryClick(stepper: StepperOptions): void {
        stepper.previous();
    }
};

/**
 *
 */
const DoneCardStep = {
    viewHeader: 'Done!!',
    headerText: 'Census - Data',
    loadingText: 'Loading...',
    primaryButtonText: 'Complete',
    secondaryButtonText: 'Back',
    Component({ app, stepper }: StepComponentProps): JSX.Element {
        const data = stepper.getState<GeocoderData>('data');
        return (
            <app.PresentationCard app={app} options={stepper} config={DoneCardStep}>
                <hr />
                <>{data.addresses.map(({ matched, coordinates, address, censusBlocks }, index) => {
                    return (
                        <div key={index}>
                            <div>Matched Address</div>
                            <div>{matched}</div>
                            <hr />
                            <div>Coordinates</div>
                            <div>x: {coordinates.x}</div>
                            <div>y: {coordinates.y}</div>
                            <hr />
                            <div>Address</div>
                            <div>From: {address.from} - To: {address.to}</div>
                            <div>Street: {address.street} {address.streetType}</div>
                            <div>City: {address.city}</div>
                            <div>State: {address.state}</div>
                            <div>Zip: {address.zip}</div>
                            <hr />
                            <div>Census Blocks</div>
                            <>{censusBlocks.map(({ tract}, index) => {
                                return <div key={index}>{index + 1}) {tract}</div>;
                            })}</>
                        </div>
                    );
                })}</>
                <hr />
            </app.PresentationCard>
        );
    },
    handlePrimaryClick(app: AppConfig, stepper: StepperOptions): void {
        stepper.complete();
    },
    handleSecondaryClick(stepper: StepperOptions): void {
        stepper.previous();
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
        VerificationCardStep,
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
