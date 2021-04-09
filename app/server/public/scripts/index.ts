import { getClient } from './client';

/**
 *
 */
const client = getClient(window);

client.renderOnClient(client);
