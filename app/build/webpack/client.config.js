const LiveReloadPlugin = require('webpack-livereload-plugin');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const config = require('../config');

const common = {
    entry: config.client.entry,
    output: config.client.output,
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(ts|tsx)$/, use: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [ { from: config.client.fonts.src, to: config.client.fonts.dest }]
        })
    ]
};

const dev = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [new LiveReloadPlugin({ delay: config.client.liveReload.delay })],
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    }
});

const prod = merge(common, { mode: 'production' });

module.exports = { dev, prod };
