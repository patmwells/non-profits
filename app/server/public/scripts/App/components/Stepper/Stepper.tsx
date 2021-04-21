import { StepperOptions, useStepper } from './state';

/**
 *
 */
interface StepperProps<T> {
    steps: T[];
    render: (stepper: StepperOptions<T>) => JSX.Element;
}

/**
 *
 */
export interface Stepper<T = unknown> {
    (props: StepperProps<T>): JSX.Element;
}

/**
 *
 */
export function Stepper<T = unknown>({ steps, render }: StepperProps<T>): JSX.Element {
    const stepper = useStepper(steps);

    return render(stepper);
}
