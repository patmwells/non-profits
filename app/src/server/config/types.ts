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
type ServerConfig = {
    serverPort: string;
}

/**
 *
 */
export type AppConfig = {
    build: BuildConfig,
    client: ClientConfig,
    server: ServerConfig
}