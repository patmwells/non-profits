import React, { useEffect, useState } from 'react';
import type { ClientApi } from '@client/types';

interface AppProps {
    config: {
        api: ClientApi;
    };
}

/**
 *
 * @param config
 */
export function App({ config }: AppProps): JSX.Element {
    const [geocoderConfigs, setGeocoderConfigs] = useState([]);

    useEffect(() => {
        config.api.getGeocoderConfigs().then(setGeocoderConfigs);
    }, []);

    console.log({ geocoderConfigs });

    return <div>Hello World!</div>;
}
