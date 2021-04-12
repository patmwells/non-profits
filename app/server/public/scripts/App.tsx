import React from 'react';
import { ClientApi } from './Api';
import { createIntroCard, IntroCardController } from './IntroCard';

/**
 *
 */
export type createClientAppConfig = typeof createClientAppConfig;

/**
 *
 */
interface ClientAppConfig {
    App: typeof App;
    IntroCard: IntroCardController;
}

/**
 *
 */
interface AppProps {
    config: ClientAppConfig;
}

/**
 *
 * @param config
 */
function App({ config: { IntroCard } }: AppProps): JSX.Element {
    return <IntroCard.Component controller={IntroCard} />;
}

/**
 *
 * @param api
 */
export function createClientAppConfig(api: ClientApi): ClientAppConfig {
    return {
        App,
        IntroCard: createIntroCard(api)
    };
}

