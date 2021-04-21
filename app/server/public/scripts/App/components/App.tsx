import React from 'react';
import type { AppConfig } from '@client/App';
import { Page } from './Styled';

/**
 *
 */
interface AppProps {
    app: AppConfig;
}

/**
 *
 * @param app
 */
export function AppContainer({ app }: AppProps): JSX.Element {
    return (
        <Page>
            <app.GeocoderStepperConfig.Component app={app} />
        </Page>
    );
}
