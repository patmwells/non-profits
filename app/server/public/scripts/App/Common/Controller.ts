/**
 *
 */
export interface BaseController<T = unknown> {
    Component: (props: T) => JSX.Element;
}
