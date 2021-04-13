import React from 'react';
import type { BaseProps } from '../Common';
import type { AppController } from './index';

/**
 *
 */
export type App = typeof App;

/**
 *
 * @param props
 */
export function App({ controller: app }: BaseProps<AppController>): JSX.Element {
    const store = app.store.createStore();
    const controller = app.getViewController(app);

    return (
        <app.store.Provider value={store}>
            <controller.Component controller={controller} />
        </app.store.Provider>
    );
}
