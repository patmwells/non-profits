import build from '../build/config';
import { createAppConfig } from './config';
import { createApp } from './app';

/**
 *
 */
const config = createAppConfig(build, process.env);
const app = createApp(config);
const port = config.port();

app.listen(port, () => {
    console.log('-> Server running on port:', port);
});