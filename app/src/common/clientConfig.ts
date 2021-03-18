interface ClientConfig {
    appRoot: string;
}

const ConfigNamespace = 'CLIENT_CONFIG';

export function getClientConfigFromWindow(window: Window): ClientConfig {
    const clientConfig = window[ConfigNamespace];

    delete window[ConfigNamespace];

    return clientConfig;
}

export function getClientConfigScript(clientConfig: ClientConfig): string {
    return `
        <script type="application/javascript">
            window.${ConfigNamespace} = ${JSON.stringify(clientConfig)}
        </script>
    `;
}