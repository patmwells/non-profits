import React from 'react';
import { View, ViewHeader, Header, Body, PrimaryButton, Container, Card } from './Styled';

/**
 *
 */
export type SelectionCard = typeof SelectionCard;

/**
 *
 */
interface SelectionCardConfig {
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
    options: unknown;
    config: SelectionCardConfig;
}

/**
 *
 */
export function SelectionCard({ options, config }: SelectionCardProps): JSX.Element {
    const {
        viewHeader,
        onPrimaryClick,
        primaryButtonText,
        onSecondaryClick,
        secondaryButtonText
    } = config;

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
                    <Header />
                    <Body />
                    <PrimaryButton onClick={handlePrimaryClick}>
                        {primaryButtonText}
                    </PrimaryButton>
                    <PrimaryButton onClick={handleSecondaryClick}>
                        {secondaryButtonText}
                    </PrimaryButton>
                </Container>
            </Card>
        </View>
    );
}
