import React, { ChangeEvent, FormEvent } from 'react';
import { AppConfig } from '@client/App';
import { View, ViewHeader, Header, Body, PrimaryButton, Container, Card } from '../Styled';
import { FormField, useForm } from './state';

/**
 *
 */
export type FormCard = typeof FormCard;

/**
 *
 */
interface FormCardConfig {
    viewHeader: string;
    submittingText: string;
    submitButtonText: string;
    onSecondaryClick: (options: unknown) => void;
    secondaryButtonText: string;
    useFormFields: (app: AppConfig, options: unknown) => FormField[];
    onSubmit: (options: unknown, fields: FormField[]) => void;
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

    const fields = config.useFormFields(app, options);
    const form = useForm(fields);

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
     * @param event
     */
    function handleOnSubmit(event: FormEvent): void {
        event.preventDefault();
        form.isSubmitting(true);
        config.onSubmit(options, form.state.fields);
        form.isSubmitting(false);
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
                    {form.state.fields.map((field, index) => {
                        return (
                            <label key={index}>
                                {field.label}
                                <input type="text" name={field.name} onChange={handleOnChange} value={field.value} />
                            </label>
                        );
                    })}
                    <PrimaryButton onClick={handleOnSubmit}>
                        {form.state.submitting ? config.submittingText : submitButtonText}
                    </PrimaryButton>
                    <PrimaryButton onClick={handleSecondaryClick}>
                        {secondaryButtonText}
                    </PrimaryButton>
                </Container>
            </Card>
        </View>
    );
}