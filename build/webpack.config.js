/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const config = require('./config');

const server = {
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    entry: config.server.entry,
    output: config.server.output,
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(ts|tsx)?$/, use: 'ts-loader', exclude: /node_modules/ },
        ]
    },
    resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] },
    optimization: { nodeEnv: false }
};

const client = {
    mode: 'development',
    entry: config.client.entry,
    output: config.client.output,
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(ts|tsx)?$/, use: 'ts-loader', exclude: /node_modules/ },
        ]
    },
    resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] },
    plugins: [new LiveReloadPlugin({ delay: config.client.liveReload.delay })]
};

module.exports = function () {
    return [ server, client ];
};