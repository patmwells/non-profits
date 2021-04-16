import React from 'react';
import { Body, Card, Container, Header, PrimaryButton, View, ViewHeader } from './Styled';

/**
 *
 */
export type IntroCard = typeof IntroCard;

/**
 *
 */
interface IntroCardConfig {
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
    config: IntroCardConfig;
    options: unknown;
}

/**
 *
 */
export function IntroCard({ options, config }: IntroCardProps): JSX.Element {
    const { viewHeader, headerText, bodyText, buttonText, onClick } = config;

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
