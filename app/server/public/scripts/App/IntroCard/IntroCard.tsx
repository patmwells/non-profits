import React from 'react';
import type { BaseProps } from '../Common';
import type { IntroCardController } from './index';

/**
 *
 */
export type IntroCard = typeof IntroCard;

/**
 *
 */
export function IntroCard({ controller }: BaseProps<IntroCardController>): JSX.Element {
    const { common, viewHeader, headerText, bodyText, buttonText, onClick } = controller;
    const { Components } = common;

    /**
     *
     */
    function handleClick(): void {
        onClick(controller);
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
