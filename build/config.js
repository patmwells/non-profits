/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
    server: {
        entry: path.resolve('server/index.ts'),
        output: {
            path: path.resolve('bin'),
            filename: 'index.js'
        }
    },
    client: {
        entry: path.resolve('server/scripts/entry.tsx'),
        output: {
            path: path.resolve('bin/assets'),
            filename: 'scripts/index.bundle.js'
        },
        liveReload: {
            script: 'http://localhost:35729/livereload.js',
            delay: 2000
        }
    }
};