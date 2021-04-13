import { useEffect, useState } from 'react';
import type { ClientApi } from '../Api';
import type { AppController } from '../App';
import type { Controller, Common } from '../Common';
import { SelectionCard } from './SelectionCard';

/**
 *
 */
export type createSelectionCard = typeof createSelectionCard;

/**
 *
 */
export interface SelectionCardController extends Controller<SelectionCard> {
    api: ClientApi;
    Common: Common;
    options: Options;
    viewHeader: string;
    useAsyncData: typeof useAsyncData;
    onPrimaryClick: typeof onPrimaryClick;
    primaryButtonText: string;
    onSecondaryClick: typeof onSecondaryClick;
    secondaryButtonText: string;
}

/**
 *
 * @param controller
 */
function onPrimaryClick(controller: SelectionCardController): void {
    controller.options.next();
}

/**
 *
 * @param controller
 */
function onSecondaryClick(controller: SelectionCardController): void {
    controller.options.previous();
}

/**
 *
 * @param controller
 */
function useAsyncData(controller: SelectionCardController): { status: string } {
    const [result, setResult] = useState({ status: '' });

    useEffect(() => {
        setResult({ status: 'PENDING' });

        controller.api.getGeocoderConfigs()
            .then(() => setResult({ status: 'SUCCESS' }))
            .catch(() => setResult({ status: 'FAILED' }));
    }, []);

    return result;
}

/**
 *
 */
interface Options {
    next: () => void;
    previous: () => void;
}

/**
 *
 * @param api
 * @param Common
 * @param options
 */
export function createSelectionCard({ api, Common }: AppController, options?: Options): SelectionCardController {
    const defaultOptions = {
        next: Common.Utils.noop,
        previous: Common.Utils.noop
    };

    return {
        api,
        Common,
        useAsyncData,
        options: Object.assign({}, defaultOptions, options),
        Component: SelectionCard,
        viewHeader: 'SelectionCard',
        onPrimaryClick,
        primaryButtonText: 'Primary',
        onSecondaryClick,
        secondaryButtonText: 'Secondary'
    };
}
