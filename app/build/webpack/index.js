const server = require('./server.config');
const client = require('./client.config');

module.exports = function({ dev }) {

    if (dev) {
        console.log('[webpack] Building DEV');
        return [server.dev, client.dev];
    }

    console.log('[webpack] Building PROD');
    return [server.prod, client.prod];
};