import { createClient, getClientConfig } from './client';

/**
 *
 */
const client = createClient(getClientConfig(window));

client.renderOnClient(client);
