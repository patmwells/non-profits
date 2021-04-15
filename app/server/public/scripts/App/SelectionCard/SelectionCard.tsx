import React from 'react';
import type { AppController } from '../index';
import type { SelectionCardController } from './index';

/**
 *
 */
export type SelectionCard = typeof SelectionCard;

/**
 *
 */
export interface Options {
    next: () => void;
    previous: () => void;
}

/**
 *
 */
interface SelectionCardProps {
    app: AppController;
    options: Options;
    controller: SelectionCardController;
}

/**
 *
 */
export function SelectionCard({ app, options, controller }: SelectionCardProps): JSX.Element {
    const {
        viewHeader,
        onPrimaryClick,
        primaryButtonText,
        onSecondaryClick,
        secondaryButtonText
    } = controller;
    const { store, common } = app;
    const { Components } = common;

    /**
     *
     */
    function handlePrimaryClick(): void {
        onPrimaryClick(options);
    }

    /**
     *
     */
    function handleSecondaryClick(): void {
        onSecondaryClick(options);
    }

    return (
        <Components.View>
            <Components.ViewHeader>{viewHeader}</Components.ViewHeader>
            <Components.Card>
                <Components.Container>
                    <store.AsyncDataLoader store={store} controller={controller}>
                        <Components.Header />
                        <Components.Body />
                        <Components.PrimaryButton onClick={handlePrimaryClick}>
                            {primaryButtonText}
                        </Components.PrimaryButton>
                        <Components.PrimaryButton onClick={handleSecondaryClick}>
                            {secondaryButtonText}
                        </Components.PrimaryButton>
                    </store.AsyncDataLoader>
                </Components.Container>
            </Components.Card>
        </Components.View>
    );
}
