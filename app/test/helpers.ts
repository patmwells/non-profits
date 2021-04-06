/**
 *
 */
export const buildConfig = {
    client: {
        output: {
            path: 'bin/public',
            filename: 'scripts/index.bundle.js'
        },
        liveReload: {
            script: 'livereload.js'
        }
    }
};

/**
 *
 */
export function getProdHTML(): string {
    const clientConfig = JSON.stringify({
        apiRoutes:{
            geocoderConfigs: '/census/geocoder/configs'
        },
        appRoot: 'appRoot',
        title: 'App',
        namespace: '__client_config__'
    });

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>App</title>
                
            </head>
            <body>
                <div id="appRoot"><div data-reactroot="">Hello World!</div></div>
                <script type="application/javascript">
                    window.__client_config__=${clientConfig}
                </script>
                <script type="application/javascript" src="scripts/index.bundle.js"></script>
            </body>
        </html>
    `;
}

/**
 *
 */
export function getDevHTML(): string {
    const clientConfig = JSON.stringify({
        apiRoutes:{
            geocoderConfigs: '/census/geocoder/configs'
        },
        appRoot: 'appRoot',
        title: 'App',
        namespace: '__client_config__'
    });

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>App</title>
                <script type="application/javascript" src="livereload.js"></script>
            </head>
            <body>
                <div id="appRoot"><div data-reactroot="">Hello World!</div></div>
                <script type="application/javascript">
                    window.__client_config__=${clientConfig}
                </script>
                <script type="application/javascript" src="scripts/index.bundle.js"></script>
            </body>
        </html>
    `;
}
