import React from 'react';
import type { AppController } from '../index';
import type { BaseController } from '../Common';
import { IntroCard, Options } from './IntroCard';

/**
 *
 * @param options
 */
function onClick(options: Options): void {
    options.next();
}

/**
 *
 */
interface ComponentProps {
    app: AppController;
    options: Options;
}

/**
 *
 * @param app
 * @param options
 */
function Component({ app, options }: ComponentProps): JSX.Element {
    return <IntroCard app={app} options={options} controller={IntroCardController} />;
}

/**
 *
 */
export interface IntroCardController extends BaseController<ComponentProps> {
    viewHeader: string;
    headerText: string;
    bodyText: string;
    buttonText: string;
    onClick: (options: Options) => void;
}

/**
 *
 */
export const IntroCardController: IntroCardController = {
    Component,
    viewHeader: 'We provide tools to help you match data',
    headerText: 'Census Information',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat erat aliquam vel nibh sed ornare convallis aliquam.',
    buttonText: 'Explore',
    onClick
};
