import React, { ChangeEvent, FormEvent } from 'react';
import { FormField, useForm } from './state';

/**
 *
 */
interface FormProps {
    fields: FormField[];
    onSubmit: (event: FormEvent, fields: FormField[]) => void;
    render: (props: { handleSubmit: (event: FormEvent) => void; fields: JSX.Element[] }) => JSX.Element;
}

/**
 *
 */
export interface Form {
    (props: FormProps): JSX.Element;
}

/**
 *
 */
export function Form({ fields, onSubmit, render }: FormProps): JSX.Element {
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
    function handleSubmit(event: FormEvent): void {
        event.preventDefault();
        form.isSubmitting(true);
        onSubmit(event, form.state.fields);
        form.isSubmitting(false);
    }

    return render({
        handleSubmit,
        fields: form.state.fields.map((field, index) => {
            return (
                <div key={index}>
                    <label>
                        {field.label}
                        <input
                            type="text"
                            name={field.name}
                            value={field.value}
                            onChange={handleOnChange}
                        />
                    </label>
                </div>
            );
        })
    });
}
