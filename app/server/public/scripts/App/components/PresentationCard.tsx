import React, { SyntheticEvent } from 'react';
import type { AppConfig } from '@client/App';
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
    handlePrimaryClick: (app: AppConfig, options: unknown) => Promise<void>;
    primaryButtonText: string;
    handleSecondaryClick: (options: unknown) => void;
    secondaryButtonText: string;
}

/**
 *
 */
interface PresentationCardProps {
    app: AppConfig;
    options: unknown;
    config: PresentationCardConfig;
    children: JSX.Element | JSX.Element[];
}

/**
 *
 * @param app
 * @param options
 * @param config
 * @param children
 */
export function PresentationCard({ app, options, config, children }: PresentationCardProps): JSX.Element {

    /**
     *
     * @param event
     */
    async function handlePrimaryClick(event: SyntheticEvent): Promise<void> {
        await config.handlePrimaryClick(app, options);
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
