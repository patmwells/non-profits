import createConfig from '../server/config';
import { AppConfig } from '../server/types';

/**
 *
 */
const testBuildConfig = {
    client: {
        output: {
            path: 'bin/public',
            filename: 'scripts/index.bundle.js'
        },
        liveReload: {
            script: 'livereload.js',
        }
    }
};

/**
 *
 * @param environment
 */
export function createTestConfig(environment: unknown): AppConfig {
    return createConfig(testBuildConfig, environment as NodeJS.ProcessEnv);
}

/**
 *
 */
export function getProdHTML(): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>App</title>
                
            </head>
            <body>
                <div id=appRoot><div data-reactroot="">Hello World!</div></div>
                <script type="application/javascript">
                    window.__client_config__={"appRoot":"appRoot","title":"App","namespace":"__client_config__"}
                </script>
                <script type="application/javascript" src=scripts/index.bundle.js></script>
            </body>
        </html>
    `;
}