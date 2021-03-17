import buildConfig from '../../build/config';

type AppConfig = {
    CLIENT_ASSETS: string;
    CLIENT_SCRIPT: string;
    CLIENT_STATE_ID: 'initialState',
    CLIENT_ROOT_ID: 'root';
    HEADER_SCRIPTS: string[];
    SERVER_PORT: string;
};

const dev: AppConfig = {
    CLIENT_ASSETS: buildConfig.client.output.path,
    CLIENT_SCRIPT: buildConfig.client.output.filename,
    CLIENT_STATE_ID: 'initialState',
    CLIENT_ROOT_ID: 'root',
    HEADER_SCRIPTS: [buildConfig.client.liveReload.script],
    SERVER_PORT: process.env.SERVER_PORT
};

const prod: AppConfig = {
    CLIENT_ASSETS: buildConfig.client.output.path,
    CLIENT_SCRIPT: buildConfig.client.output.filename,
    CLIENT_STATE_ID: 'initialState',
    CLIENT_ROOT_ID: 'root',
    HEADER_SCRIPTS: [],
    SERVER_PORT: process.env.SERVER_PORT
};

export default process.env.NODE_ENV === 'production' ? prod : dev;