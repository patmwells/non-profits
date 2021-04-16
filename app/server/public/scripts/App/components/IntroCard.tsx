import React from 'react';
import type { AppController } from '@client/App';

/**
 *
 */
export type IntroCard = typeof IntroCard;

/**
 *
 */
interface IntroCardController {
    viewHeader: string;
    headerText: string;
    bodyText: string;
    buttonText: string;
    onClick: (options: unknown) => void;
}

/**
 *
 */
interface IntroCardProps {
    controller: IntroCardController;
    app: AppController;
    options: unknown;
}

/**
 *
 */
export function IntroCard({ app, options, controller }: IntroCardProps): JSX.Element {
    const { viewHeader, headerText, bodyText, buttonText, onClick } = controller;
    const { View, ViewHeader, Card, Container, Header, Body, PrimaryButton } = app;

    /**
     *
     */
    function handleClick(): void {
        onClick(options);
    }

    return (
        <View>
            <ViewHeader>{viewHeader}</ViewHeader>
            <Card>
                <Container>
                    <Header>{headerText}</Header>
                    <Body>{bodyText}</Body>
                    <PrimaryButton onClick={handleClick}>{buttonText}</PrimaryButton>
                </Container>
            </Card>
        </View>
    );
}
