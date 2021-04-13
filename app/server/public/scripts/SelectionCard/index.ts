import type { AppController } from '../App';
import type { Store } from '../Store';
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
    app: AppController;
    store: Store;
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
function useAsyncData({ app }: SelectionCardController): { status: string } {
    return app.store.useGeocoderConfigs(app);
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
export function createSelectionCard(app: AppController, options?: Options): SelectionCardController {
    const { common, store } = app;

    const defaultOptions = {
        next: common.Utils.noop,
        previous: common.Utils.noop
    };

    return {
        app,
        store,
        common,
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
