import React, { useEffect, useState } from 'react';
import type { ClientApi } from '../api';

/**
 *
 */
export type App = typeof App;

/**
 *
 */
interface AppProps {
    api: ClientApi;
}

/**
 *
 * @param config
 */
export function App({ api }: AppProps): JSX.Element {
    const [geocoderConfigs, setGeocoderConfigs] = useState([]);

    useEffect(() => {
        api.getGeocoderConfigs().then(setGeocoderConfigs);
    }, []);

    console.log({ geocoderConfigs });

    return <div>Hello World!</div>;
}
