import React from 'react';
import type { AppController } from '@client/App';
import type { State, StoreController } from '@client/Store';

/**
 *
 */
export type SelectionCard = typeof SelectionCard;

/**
 *
 */
interface SelectionCardController {
    useAsyncData: (store: StoreController) => State;
    viewHeader: string;
    onPrimaryClick: (options: unknown) => void;
    primaryButtonText: string;
    onSecondaryClick: (options: unknown) => void;
    secondaryButtonText: string;
}

/**
 *
 */
interface SelectionCardProps {
    app: AppController;
    options: unknown;
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
    const { store, View, ViewHeader, Card, Container, Header, Body, PrimaryButton } = app;

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
        <View>
            <ViewHeader>{viewHeader}</ViewHeader>
            <Card>
                <Container>
                    <store.AsyncDataLoader store={store} controller={controller}>
                        <Header />
                        <Body />
                        <PrimaryButton onClick={handlePrimaryClick}>
                            {primaryButtonText}
                        </PrimaryButton>
                        <PrimaryButton onClick={handleSecondaryClick}>
                            {secondaryButtonText}
                        </PrimaryButton>
                    </store.AsyncDataLoader>
                </Container>
            </Card>
        </View>
    );
}
