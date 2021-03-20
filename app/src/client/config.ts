import { ConfigNamespace, ClientConfig } from '../common/types/clientConfig';

export function getClientConfigFromWindow(window: Window): ClientConfig {
    const clientConfig = window[ConfigNamespace];

    delete window[ConfigNamespace];

    return clientConfig;
}