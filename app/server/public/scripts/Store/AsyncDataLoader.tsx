import React from 'react';
import type { State } from './store';

/**
 *
 */
export type AsyncDataLoader = typeof AsyncDataLoader;

/**
 *
 */
export enum AsyncStatus {
    pending = 'PENDING',
    success = 'SUCCESS',
    failed = 'FAILED'
}

/**
 *
 */
interface AsyncDataLoaderController {
    useAsyncData: (controller: AsyncDataLoaderController) => State;
}

/**
 *
 */
interface AsyncDataLoaderProps {
    controller: AsyncDataLoaderController;
    children: JSX.Element | JSX.Element[];
}

/**
 *
 * @param controller
 * @param render
 */
export function AsyncDataLoader({ controller, children }: AsyncDataLoaderProps): JSX.Element {
    const result = controller.useAsyncData(controller);

    if (!result.status || result.status === AsyncStatus.pending) {
        return <div>Loading...</div>;
    }

    if (result.status === AsyncStatus.failed) {
        return <div>Failed!</div>;
    }

    return <>{children}</>;
}
