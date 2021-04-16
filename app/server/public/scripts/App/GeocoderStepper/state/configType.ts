export enum FormActions {
    change = 'change'
}

/**
 *
 */
interface Action {
    type: FormActions;
    name: string;
    value: string;
}

/**
 *
 */
interface FormState {
    fields: { label: string; name: string; value: string }[];
}

/**
 *
 * @param labels
 */
export function getInitialFormState(labels: string[]): FormState {
    const fields = labels.map((label) => ({ label, name: label, value: '' }));

    return {
        fields
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
 */
const Handlers = {
    change: onChange
};

/**
 *
 * @param state
 * @param action
 */
export function formReducer(state: FormState, action: Action): FormState {
    const handler = Handlers[action.type];

    if (!handler) {
        throw new Error('unknown action type!');
    }

    return handler(Object.assign({}, state), action);
}
