import { useReducer } from 'react';

/**
 *
 */
enum Actions {
    change = 'change',
    submitting = 'submitting'
}

/**
 *
 */
interface Action {
    type: Actions;
    name?: string;
    value?: string;
    submitting?: boolean;
}

/**
 *
 */
export interface FormField {
    label: string;
    name: string;
    value: string;
}

/**
 *
 */
interface FormState {
    fields: FormField[];
    submitting: boolean;
}

/**
 *
 * @param fields
 */
function getInitialFormState(fields: FormField[]): FormState {
    return {
        fields,
        submitting: false
    };
}

/**
 *
 * @param state
 * @param action
 */
function onChange(state: FormState, action: Action): FormState {
    const field = state.fields.find(field => field.name === action.name);

    field.value = action.value;

    return state;
}

/**
 *
 * @param state
 * @param action
 */
function onSubmitting(state: FormState, action: Action): FormState {
    state.submitting = action.submitting;

    return state;
}

/**
 *
 */
const Handlers = {
    [Actions.change]: onChange,
    [Actions.submitting]: onSubmitting
};

/**
 *
 * @param state
 * @param action
 */
function formReducer(state: FormState, action: Action): FormState {
    const handler = Handlers[action.type];

    if (!handler) {
        throw new Error('unknown action type!');
    }

    return handler(Object.assign({}, state), action);
}

/**
 *
 */
interface Form {
    state: FormState;
    onChange: (name: string, value: string) => void;
    isSubmitting: (submitting: boolean) => void;
}

/**
 *
 * @param fields
 */
export function useForm(fields: FormField[]): Form {
    const [state, dispatch] = useReducer(formReducer, getInitialFormState(fields));

    return {
        state,
        onChange: function (name: string, value: string): void {
            dispatch({ type: Actions.change, name, value });
        },
        isSubmitting: function (submitting: boolean): void {
            dispatch({ type: Actions.submitting, submitting });
        }
    };
}
