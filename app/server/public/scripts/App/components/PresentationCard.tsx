import React, { SyntheticEvent, useState } from 'react';
import type { AppConfig } from '@client/App';
import { Body, Header, PrimaryButton } from './Styled';

/**
 *
 */
interface PresentationCardConfig {
    headerText: string;
    loadingText: string;
    handlePrimaryClick: (app: AppConfig, options: unknown) => Promise<void> | void;
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
 */
export interface PresentationCard {
    (props: PresentationCardProps): JSX.Element;
}

/**
 *
 * @param app
 * @param options
 * @param config
 * @param children
 */
export function PresentationCard({ app, options, config, children }: PresentationCardProps): JSX.Element {
    const [loading, setIsLoading] = useState(false);

    /**
     *
     * @param event
     */
    async function handlePrimaryClick(event: SyntheticEvent): Promise<void> {
        setIsLoading(true);
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
        <>
            <Header>{config.headerText}</Header>
            <Body>{children}</Body>
            <PrimaryButton onClick={handlePrimaryClick}>
                {loading ? config.loadingText : config.primaryButtonText}
            </PrimaryButton>
            <PrimaryButton onClick={handleSecondaryClick}>
                {config.secondaryButtonText}
            </PrimaryButton>
        </>
    );
}
