import { ClientApi } from '../Api';
import { IntroCard, Controller } from './IntroCard';

/**
 *
 */
export type createIntroCard = typeof createIntroCard;

/**
 *
 */
export interface IntroCardController extends Controller {
    api: ClientApi;
    Component: IntroCard;
}

/**
 *
 * @param controller
 */
function onItemClick(controller: IntroCardController): void {
    console.log({ controller });
}

/**
 *
 * @param api
 */
export function createIntroCard(api: ClientApi): IntroCardController {
    return {
        api,
        Component: IntroCard,
        onItemClick
    };
}
