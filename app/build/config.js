const path = require('path');

module.exports = {
    server: {
        entry: path.resolve('server/index.ts'),
        output: {
            path: path.resolve('bin/server'),
            filename: 'index.js'
        }
    },
    client: {
        entry: path.resolve('server/public/scripts/index.tsx'),
        output: {
            path: path.resolve('bin/public'),
            filename: 'scripts/index.bundle.js'
        },
        liveReload: {
            script: 'http://localhost:35729/livereload.js',
            delay: 5000
        }
    }
};
