import React from 'react';
import type { AppController } from '../index';
import type { IntroCardController } from './index';

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
export type IntroCard = typeof IntroCard;

/**
 *
 */
interface IntroCardProps {
    controller: IntroCardController;
    app: AppController;
    options: Options;
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
