import { useEffect } from 'react';
import { AsyncStatus } from './AsyncDataLoader';
import { Actions, State, useStore } from './store';

/**
 *
 */
export type useDataRequest = typeof useDataRequest;

/**
 *
 */
export interface DataRequest {
    type: Actions;
    request: () => Promise<unknown>;
}

/**
 *
 * @param type
 * @param request
 */
export function useDataRequest({ type, request }: DataRequest): State {
    const { state, dispatch } = useStore();
    const result = state[type];

    useEffect(() => {

        if (result.status) {
            return;
        }

        dispatch({ type, status: AsyncStatus.pending });

        request()
            .then(data => dispatch({
                type,
                status: AsyncStatus.success,
                data
            }))
            .catch((error) => dispatch({
                type,
                status: AsyncStatus.failed,
                error
            }));

    }, [result, dispatch, type, request]);

    return result;
}
