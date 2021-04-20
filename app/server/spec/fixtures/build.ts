/**
 *
 */
const config = {
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
export interface BuildFixtures {
    config: typeof config;
}

/**
 *
 */
export const BuildFixtures: BuildFixtures = {
    config
};
