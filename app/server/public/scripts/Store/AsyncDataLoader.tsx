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
interface AsyncDataLoaderConfig {
    useAsyncData: (store: StoreController) => State;
}

/**
 *
 */
interface AsyncDataLoaderProps {
    store: StoreController;
    config: AsyncDataLoaderConfig;
    children: JSX.Element | JSX.Element[];
}

/**
 *
 * @param store
 * @param config
 * @param children
 */
export function AsyncDataLoader({ store, config, children }: AsyncDataLoaderProps): JSX.Element {
    const result = config.useAsyncData(store);

    if (!result.status || result.status === AsyncStatus.pending) {
        return <div>Loading...</div>;
    }

    if (result.status === AsyncStatus.failed) {
        return <div>Failed!</div>;
    }

    return <>{children}</>;
}
