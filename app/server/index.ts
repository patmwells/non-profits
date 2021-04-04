import createConfig from './config';
import createApp from './app';
import build from '../build/config';

/**
 *
 */
const config = createConfig(build, process.env);
const app = createApp(config);

/**
 *
 */
const port = config.port();

app.listen(port, () => {
    console.log('-> Server running on port:', port);
});