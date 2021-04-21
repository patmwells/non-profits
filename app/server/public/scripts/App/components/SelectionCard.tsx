import React from 'react';
import { AppConfig } from '@client/App';
import { Header, Body, PrimaryButton, SelectionOptions } from './Styled';

/**
 *
 */
interface SelectionCardConfig {
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
export interface SelectionCard {
    (props: SelectionCardProps): JSX.Element;
}

/**
 *
 */
export function SelectionCard({ app, options, config }: SelectionCardProps): JSX.Element {
    const { onSecondaryClick, secondaryButtonText, onSelection } = config;

    const selections = config.useSelections(app, options);

    /**
     *
     */
    function handleSecondaryClick(): void {
        onSecondaryClick(options);
    }

    return (
        <>
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
        </>
    );
}
