import React from 'react';
import { AppConfig } from '@client/App';
import { View, ViewHeader, Header, Body, PrimaryButton, Container, Card, SelectionOptions } from './Styled';

/**
 *
 */
export type SelectionCard = typeof SelectionCard;

/**
 *
 */
interface SelectionCardConfig {
    viewHeader: string;
    onSecondaryClick: (options: unknown) => void;
    secondaryButtonText: string;
    useSelections: (app: AppConfig, options: unknown) => string[];
    onSelection: (options: unknown, selection: string) => void;
}

/**
 *
 */
interface SelectionCardProps {
    app: AppConfig;
    options: unknown;
    config: SelectionCardConfig;
}

/**
 *
 */
export function SelectionCard({ app, options, config }: SelectionCardProps): JSX.Element {
    const { viewHeader, onSecondaryClick, secondaryButtonText, onSelection } = config;

    const selections = config.useSelections(app, options);

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
                    {selections.map((selection, index) => {
                        return (
                            <SelectionOptions key={index} onClick={(): void => onSelection(options, selection)}>
                                {selection}
                            </SelectionOptions>
                        );
                    })}
                    <PrimaryButton onClick={handleSecondaryClick}>
                        {secondaryButtonText}
                    </PrimaryButton>
                </Container>
            </Card>
        </View>
    );
}
