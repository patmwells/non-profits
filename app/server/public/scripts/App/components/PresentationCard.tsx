import React, { SyntheticEvent } from 'react';
import { Body, Card, Container, Header, PrimaryButton, View, ViewHeader } from './Styled';

/**
 *
 */
export type PresentationCard = typeof PresentationCard;

/**
 *
 */
interface PresentationCardConfig {
    viewHeader: string;
    headerText: string;
    handlePrimaryClick: (options: unknown) => void;
    primaryButtonText: string;
    handleSecondaryClick: (options: unknown) => void;
    secondaryButtonText: string;
}

/**
 *
 */
interface PresentationCardProps {
    options: unknown;
    config: PresentationCardConfig;
    children: JSX.Element | JSX.Element[];
}

/**
 *
 * @param options
 * @param config
 * @param children
 * @constructor
 */
export function PresentationCard({ options, config, children }: PresentationCardProps): JSX.Element {

    /**
     *
     * @param event
     */
    function handlePrimaryClick(event: SyntheticEvent): void {
        config.handlePrimaryClick(options);
    }

    /**
     *
     * @param event
     */
    function handleSecondaryClick(event: SyntheticEvent): void {
        config.handleSecondaryClick(options);
    }

    return (
        <View>
            <ViewHeader>{config.viewHeader}</ViewHeader>
            <Card>
                <Container>
                    <Header>{config.headerText}</Header>
                    <Body>{children}</Body>
                    <PrimaryButton onClick={handlePrimaryClick}>
                        {config.primaryButtonText}
                    </PrimaryButton>
                    <PrimaryButton onClick={handleSecondaryClick}>
                        {config.secondaryButtonText}
                    </PrimaryButton>
                </Container>
            </Card>
        </View>
    );
}
