import React from 'react';
import { Body, Header, PrimaryButton } from './Styled';

/**
 *
 */
interface IntroCardConfig {
    headerText: string;
    bodyText: string;
    buttonText: string;
    onClick: (options: unknown) => void;
}

/**
 *
 */
interface IntroCardProps {
    config: IntroCardConfig;
    options: unknown;
}

/**
 *
 */
export interface IntroCard {
    (props: IntroCardProps): JSX.Element;
}

/**
 *
 */
export function IntroCard({ options, config }: IntroCardProps): JSX.Element {
    const { headerText, bodyText, buttonText, onClick } = config;

    /**
     *
     */
    function handleClick(): void {
        onClick(options);
    }

    return (
        <>
            <Header>{headerText}</Header>
            <Body>{bodyText}</Body>
            <PrimaryButton onClick={handleClick}>{buttonText}</PrimaryButton>
        </>
    );
}
