import React from 'react';
import { Body, Header, PrimaryButton } from './Styled';

/**
 *
 */
export type IntroCard = typeof IntroCard;

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
