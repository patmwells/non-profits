const path = require('path');

const outputPath = path.resolve('bin/public');

module.exports = {
    server: {
        entry: path.resolve('server/index.ts'),
        output: {
            path: path.resolve('bin/server'),
            filename: 'index.js'
        }
    },
    client: {
        entry: path.resolve('server/public/scripts/index.ts'),
        output: {
            path: outputPath,
            filename: 'scripts/index.bundle.js'
        },
        liveReload: {
            script: 'http://localhost:35729/livereload.js',
            delay: 5000
        },
        fonts: {
            src: path.resolve('server/public/fonts'),
            dest: path.resolve(`${outputPath}/fonts`)
        }
    }
};
