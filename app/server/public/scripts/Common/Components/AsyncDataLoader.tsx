import React from 'react';
import type { BaseProps } from '../Controller';

/**
 *
 */
export type AsyncDataLoader = typeof AsyncDataLoader;

/**
 *
 */
interface AsyncDataLoaderController {
    useAsyncData: (controller: AsyncDataLoaderController) => { status: string };
}

/**
 *
 */
interface AsyncDataLoaderProps extends BaseProps<AsyncDataLoaderController> {
    children: JSX.Element | JSX.Element[];
}

/**
 *
 * @param controller
 * @param render
 */
export function AsyncDataLoader({ controller, children }: AsyncDataLoaderProps): JSX.Element {
    const result = controller.useAsyncData(controller);

    if (!result.status || result.status === 'PENDING') {
        return <div>Loading...</div>;
    }

    if (result.status === 'FAILED') {
        return <div>Failed!</div>;
    }

    return <>{children}</>;
}
