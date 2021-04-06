import React, { useEffect, useState } from 'react';
import type { ClientConfig } from '../types';

/**
 *
 */
export default function App({ config }: { config: ClientConfig }): JSX.Element {
    const [geocoderConfigs, setGeocoderConfigs] = useState([]);

    useEffect(() => {
        config.fetchGeocoderConfig(config).then(setGeocoderConfigs);
    }, []);

    return (
        <div>Hello World!</div>
    );
}
