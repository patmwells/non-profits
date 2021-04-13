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
    const controller = app.getViewController(app);

    return <controller.Component controller={controller} />;
}
