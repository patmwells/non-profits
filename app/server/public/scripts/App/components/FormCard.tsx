import React, { ChangeEvent, FormEvent } from 'react';
import { AppConfig } from '@client/App';
import { View, ViewHeader, Header, Body, PrimaryButton, Container, Card } from './Styled';

/**
 *
 */
export type FormCard = typeof FormCard;

/**
 *
 */
export interface Form {
    fields: { label: string; name: string; value: string }[];
    onChange: (name: string, value: string) => void;
    onSubmit: () => void;
}

/**
 *
 */
interface FormCardConfig {
    viewHeader: string;
    submitButtonText: string;
    onSecondaryClick: (options: unknown) => void;
    secondaryButtonText: string;
    useForm: (app: AppConfig, options: unknown) => Form;
}

/**
 *
 */
interface FormCardProps {
    app: AppConfig;
    options: unknown;
    config: FormCardConfig;
}

/**
 *
 */
export function FormCard({ app, options, config }: FormCardProps): JSX.Element {
    const { viewHeader, submitButtonText, onSecondaryClick, secondaryButtonText } = config;

    const form = config.useForm(app, options);

    /**
     *
     * @param event
     */
    function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
        event.preventDefault();

       form.onChange(event.currentTarget.name, event.currentTarget.value);
    }

    /**
     *
     */
    function handleOnSubmit(event: FormEvent): void {
        event.preventDefault();

        form.onSubmit();
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
                    {form.fields.map((field, index) => {
                        return (
                            <label key={index}>
                                {field.label}
                                <input type="text" name={field.name} onChange={handleOnChange} value={field.value} />
                            </label>
                        );
                    })}
                    <PrimaryButton onClick={handleOnSubmit}>{submitButtonText}</PrimaryButton>
                    <PrimaryButton onClick={handleSecondaryClick}>
                        {secondaryButtonText}
                    </PrimaryButton>
                </Container>
            </Card>
        </View>
    );
}
