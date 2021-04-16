/**
 *
 */
export interface Stepper {
    steps: unknown[];
    maxSteps: number;
    currentStep: number;
    returnType: string;
    searchType: string;
    configType: { label: string; name: string; value: string }[];
}

/**
 *
 */
export enum Actions {
    next = 'next',
    previous = 'previous',
    complete = 'complete'
}

/**
 *
 */
interface Action {
    type: Actions;
    name?: string;
    value?: string | { label: string; name: string; value: string }[];
}

/**
 *
 * @param steps
 */
export function getInitialState(steps: unknown[]): Stepper {
    return {
        steps,
        currentStep: 0,
        maxSteps: steps.length - 1,
        returnType: null,
        searchType: null,
        configType: null
    };
}

/**
 *
 * @param state
 * @param action
 */
function onNext(state: Stepper, action: Action): Stepper {
    const nextStep = state.currentStep + 1;

    if (nextStep > state.maxSteps) {
        return state;
    }

    if (action.value) {
        state[action.name] = action.value;
    }

    state.currentStep = nextStep;

    return state;
}

/**
 *
 * @param state
 * @param action
 */
function onPrevious(state: Stepper, action: Action): Stepper {
    const previousStep = state.currentStep - 1;

    if (previousStep < 0) {
        return state;
    }

    state[action.name] = null;

    state.currentStep = previousStep;

    return state;
}

/**
 *
 * @param state
 */
function onComplete(state: Stepper): Stepper {
    return getInitialState(state.steps);
}

/**
 *
 */
const Handlers = {
    [Actions.next]: onNext,
    [Actions.previous]: onPrevious,
    [Actions.complete]: onComplete
};

/**
 *
 * @param state
 * @param action
 */
export function stepperReducer(state: Stepper, action: Action): Stepper {
    const handler = Handlers[action.type];

    if (!handler) {
        throw new Error('unknown action type!');
    }

    return handler(Object.assign({}, state), action);
}
