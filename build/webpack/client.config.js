const LiveReloadPlugin = require('webpack-livereload-plugin');
const { merge } = require('webpack-merge');
const config = require('../config');

const common = {
    entry: config.client.entry,
    output: config.client.output,
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(ts|tsx)?$/, use: 'ts-loader', exclude: /node_modules/ },
        ]
    },
    resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] }
};

const dev = merge(common, {
    mode: 'development',
    plugins: [new LiveReloadPlugin({ delay: config.client.liveReload.delay })]
});

const prod = merge(common, { mode: 'production' });

module.exports = { dev, prod };