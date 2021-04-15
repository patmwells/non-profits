import React from 'react';
import type { AppController } from './index';

/**
 *
 */
export type App = typeof App;

/**
 *
 */
interface AppProps {
    controller: AppController;
}

/**
 *
 * @param props
 */
export function App({ controller: app }: AppProps): JSX.Element {
    const store = app.store.getStore();

    return (
        <app.store.Provider value={store}>
            <app.StepperController.Component
                app={app}
                steps={[app.IntroCardController, app.SelectionCardController]}
            />
        </app.store.Provider>
    );
}
