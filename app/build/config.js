const path = require('path');

module.exports = {
    server: {
        entry: path.resolve('src/server/index.ts'),
        output: {
            path: path.resolve('bin'),
            filename: 'server.js'
        }
    },
    client: {
        entry: path.resolve('src/client/index.ts'),
        output: {
            path: path.resolve('bin/client'),
            filename: 'index.bundle.js'
        },
        liveReload: {
            script: 'http://localhost:35729/livereload.js',
            delay: 5000
        }
    }
};