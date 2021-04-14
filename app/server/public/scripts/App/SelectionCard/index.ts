import type { AppController } from '../index';
import type { GeocoderConfigState, StoreController } from '../../Store';
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
    store: StoreController;
    common: Common;
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
function useAsyncData({ store }: SelectionCardController): GeocoderConfigState {
    return store.useGeocoderConfigs(store);
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
 * @param app
 * @param options
 */
export function createSelectionCard({ common, store }: AppController, options?: Options): SelectionCardController {
    const defaults = {
        next: common.Utils.noop,
        previous: common.Utils.noop
    };
    const configOptions = Object.assign({}, defaults, options);

    return {
        store,
        common,
        options: configOptions,
        useAsyncData,
        Component: SelectionCard,
        viewHeader: 'SelectionCard',
        onPrimaryClick,
        primaryButtonText: 'Primary',
        onSecondaryClick,
        secondaryButtonText: 'Secondary'
    };
}
