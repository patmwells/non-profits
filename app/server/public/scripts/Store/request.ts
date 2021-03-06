import { useEffect } from 'react';
import { AsyncStatus } from './AsyncDataLoader';
import { Actions, State, useStore } from './store';

/**
 *
 */
export interface DataRequest<T> {
    type: Actions;
    request: () => Promise<T>;
}

/**
 *
 * @param type
 * @param request
 */
export function useDataRequest<T>({ type, request }: DataRequest<T>): State<T> {
    const { state, dispatch } = useStore();
    const result = state[type] as State<T>;

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
