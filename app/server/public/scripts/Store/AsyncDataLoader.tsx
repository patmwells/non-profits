import React from 'react';
import type { State } from './store';
import type { StoreController } from './index';

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
    useAsyncData: (store: StoreController) => State;
}

/**
 *
 */
interface AsyncDataLoaderProps {
    store: StoreController;
    controller: AsyncDataLoaderController;
    children: JSX.Element | JSX.Element[];
}

/**
 *
 * @param controller
 * @param render
 */
export function AsyncDataLoader({ store, controller, children }: AsyncDataLoaderProps): JSX.Element {
    const result = controller.useAsyncData(store);

    if (!result.status || result.status === AsyncStatus.pending) {
        return <div>Loading...</div>;
    }

    if (result.status === AsyncStatus.failed) {
        return <div>Failed!</div>;
    }

    return <>{children}</>;
}
