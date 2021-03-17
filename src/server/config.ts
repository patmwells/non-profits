import buildConfig from '../../build/config';

type AppConfig = {
    CLIENT_APP_ROOT: 'appRoot';
    CLIENT_ASSETS: string;
    FOOTER_SCRIPTS: string[],
    HEADER_SCRIPTS: string[];
    SERVER_PORT: string;
};

const dev: AppConfig = {
    CLIENT_APP_ROOT: 'appRoot',
    CLIENT_ASSETS: buildConfig.client.output.path,
    FOOTER_SCRIPTS: [buildConfig.client.output.filename],
    HEADER_SCRIPTS: [buildConfig.client.liveReload.script],
    SERVER_PORT: process.env.SERVER_PORT
};

const prod: AppConfig = {
    CLIENT_APP_ROOT: 'appRoot',
    CLIENT_ASSETS: buildConfig.client.output.path,
    FOOTER_SCRIPTS: [buildConfig.client.output.filename],
    HEADER_SCRIPTS: [],
    SERVER_PORT: process.env.SERVER_PORT
};

export default process.env.NODE_ENV === 'production' ? prod : dev;