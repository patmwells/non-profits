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
    const { Components } = app.common;

    /**
     *
     */
    function handleClick(): void {
        onClick(options);
    }

    return (
        <Components.View>
            <Components.ViewHeader>{viewHeader}</Components.ViewHeader>
            <Components.Card>
                <Components.Container>
                    <Components.Header>{headerText}</Components.Header>
                    <Components.Body>{bodyText}</Components.Body>
                    <Components.PrimaryButton onClick={handleClick}>{buttonText}</Components.PrimaryButton>
                </Components.Container>
            </Components.Card>
        </Components.View>
    );
}
