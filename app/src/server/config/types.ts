import { ClientConfig } from '../../common/types/clientConfig';

/**
 *
 */
type BuildConfig = {
    clientAssets: string;
    clientScript: string;
    liveReload: string;
}

/**
 *
 */
type EnvConfig = {
    serverPort: string;
}

/**
 *
 */
export type AppConfig = {
    build: BuildConfig,
    client: ClientConfig,
    env: EnvConfig
}