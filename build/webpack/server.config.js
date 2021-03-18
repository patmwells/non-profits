const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const config = require('../config');

const common = {
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

const dev = merge(common, { mode: 'development' });

const prod = merge(common, { mode: 'production' });

module.exports = { dev, prod };