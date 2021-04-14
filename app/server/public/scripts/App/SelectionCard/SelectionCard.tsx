import React from 'react';
import type { BaseProps } from '../Common';
import type { SelectionCardController } from './index';

/**
 *
 */
export type SelectionCard = typeof SelectionCard;

/**
 *
 */
export function SelectionCard({ controller }: BaseProps<SelectionCardController>): JSX.Element {
    const {
        store,
        common,
        viewHeader,
        onPrimaryClick,
        primaryButtonText,
        onSecondaryClick,
        secondaryButtonText
    } = controller;
    const { Components } = common;

    /**
     *
     */
    function handlePrimaryClick(): void {
        onPrimaryClick(controller);
    }

    /**
     *
     */
    function handleSecondaryClick(): void {
        onSecondaryClick(controller);
    }

    return (
        <Components.View>
            <Components.ViewHeader>{viewHeader}</Components.ViewHeader>
            <Components.Card>
                <Components.Container>
                    <store.AsyncDataLoader controller={controller}>
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
