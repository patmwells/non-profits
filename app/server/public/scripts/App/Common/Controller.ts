/**
 *
 */
export interface BaseProps<T> {
    controller: T;
}

/**
 *
 */
export interface Controller<T = (props: BaseProps<Controller>) => JSX.Element> {
    Component: T;
}
