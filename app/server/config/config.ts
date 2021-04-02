import type { Config } from './types';
import { getPageHTML } from './view';
import { getSSRContent } from './ssr';
import {
    appRoot,
    assets,
    clientConfig,
    clientNamespace,
    footerScripts,
    headerScripts,
    port
} from './static';

/**
 *
 */
export const config: Config = {
    appRoot,
    assets,
    clientConfig,
    clientNamespace,
    footerScripts,
    getPageHTML,
    headerScripts,
    port,
    getSSRContent
};