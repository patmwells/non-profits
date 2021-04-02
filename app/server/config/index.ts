import { Config } from './types';
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
const config: Config = {
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

export { Config };

export default config;