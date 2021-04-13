import type { AppController } from '../App';
import type { Controller, Common } from '../Common';
import { IntroCard } from './IntroCard';

/**
 *
 */
export type createIntroCard = typeof createIntroCard;

/**
 *
 */
export interface IntroCardController extends Controller<IntroCard> {
    Common: Common;
    options: Options;
    viewHeader: string;
    headerText: string;
    bodyText: string;
    buttonText: string;
    onClick: typeof onClick;
}

/**
 *
 * @param controller
 */
function onClick(controller: IntroCardController): void {
    controller.options.next();
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
 * @param Common
 * @param options
 */
export function createIntroCard({ Common }: AppController, options?: Options): IntroCardController {
    const defaultOptions = {
        next: Common.Utils.noop,
        previous: Common.Utils.noop
    };

    return {
        Common,
        options: Object.assign({}, defaultOptions, options),
        Component: IntroCard,
        viewHeader: 'We provide tools to help you match data',
        headerText: 'Census Information',
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat erat aliquam vel nibh sed ornare convallis aliquam.',
        buttonText: 'Explore',
        onClick
    };
}
