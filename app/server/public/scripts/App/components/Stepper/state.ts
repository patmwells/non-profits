import { useReducer } from 'react';

/**
 *
 */
interface StepperState {
    steps: unknown[];
    maxSteps: number;
    currentStep: number;
    state: {
        [keyof: string]: unknown;
    };
}

/**
 *
 */
enum Actions {
    setState = 'setState',
    next = 'next',
    previous = 'previous',
    complete = 'complete'
}

/**
 *
 */
interface Action {
    type: Actions;
    key?: string;
    value?: unknown;
}

/**
 *
 * @param steps
 */
function getInitialStepper(steps: unknown[]): StepperState {
    return {
        steps,
        currentStep: 0,
        maxSteps: steps.length - 1,
        state: {}
    };
}

/**
 *
 * @param stepper
 * @param action
 */
function onSetState(stepper: StepperState, action: Action): StepperState {

    stepper.state[action.key] = action.value;

    return stepper;
}

/**
 *
 * @param stepper
 */
function onNext(stepper: StepperState): StepperState {
    const nextStep = stepper.currentStep + 1;

    if (nextStep > stepper.maxSteps) {
        return stepper;
    }

    stepper.currentStep = nextStep;

    return stepper;
}

/**
 *
 * @param stepper
 */
function onPrevious(stepper: StepperState): StepperState {
    const previousStep = stepper.currentStep - 1;

    if (previousStep < 0) {
        return stepper;
    }

    stepper.currentStep = previousStep;

    return stepper;
}

/**
 *
 * @param stepper
 */
function onComplete(stepper: StepperState): StepperState {
    return getInitialStepper(stepper.steps);
}

/**
 *
 */
const Handlers = {
    [Actions.setState]: onSetState,
    [Actions.next]: onNext,
    [Actions.previous]: onPrevious,
    [Actions.complete]: onComplete
};

/**
 *
 * @param state
 * @param action
 */
function stepperReducer(state: StepperState, action: Action): StepperState {
    const handler = Handlers[action.type];

    if (!handler) {
        throw new Error('unknown action type!');
    }

    return handler(Object.assign({}, state), action);
}

/**
 *
 */
export interface StepperOptions<T = unknown> {
    step: T;
    setState: (key: string, value: unknown) => void;
    getState: <S>(key: string) => S;
    next: () => void;
    previous: () => void;
    complete: () => void;
}

/**
 *
 * @param steps
 */
export function useStepper<T>(steps: T[]): StepperOptions<T> {
    const [stepper, dispatch] = useReducer(stepperReducer, getInitialStepper(steps));
    const step = steps[stepper.currentStep];

    return {
        step,
        setState: function (key: string, value: unknown): void {
            dispatch({ type: Actions.setState, key, value });
        },
        getState: function <S>(key: string): S {
            return stepper.state[key] as S;
        },
        next: (): void => {
            dispatch({ type: Actions.next });
        },
        previous: (): void => {
            dispatch({ type: Actions.previous });
        },
        complete: (): void => {
            dispatch({ type: Actions.complete });
        }
    };
}
