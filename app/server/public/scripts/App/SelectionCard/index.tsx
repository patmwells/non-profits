import React from 'react';
import type { AppController } from '../index';
import type { BaseController } from '../Common';
import type { GeocoderConfigState, StoreController } from '../../Store';
import { Options, SelectionCard } from './SelectionCard';

/**
 *
 * @param options
 */
function onPrimaryClick(options: Options): void {
    options.next();
}

/**
 *
 * @param options
 */
function onSecondaryClick(options: Options): void {
    options.previous();
}

/**
 *
 * @param store
 */
function useAsyncData(store: StoreController): GeocoderConfigState {
    return store.useGeocoderConfigs(store);
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
    return <SelectionCard app={app} options={options} controller={SelectionCardController} />;
}

/**
 *
 */
export interface SelectionCardController extends BaseController<ComponentProps> {
    viewHeader: string;
    useAsyncData: typeof useAsyncData;
    onPrimaryClick: typeof onPrimaryClick;
    primaryButtonText: string;
    onSecondaryClick: typeof onSecondaryClick;
    secondaryButtonText: string;
}

/**
 *
 */
export const SelectionCardController: SelectionCardController = {
    Component,
    useAsyncData,
    viewHeader: 'SelectionCard',
    onPrimaryClick,
    primaryButtonText: 'Primary',
    onSecondaryClick,
    secondaryButtonText: 'Secondary'
};
