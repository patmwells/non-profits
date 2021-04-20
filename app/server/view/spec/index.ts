import type { TestConfig } from '@server/spec';

/**
 *
 * @param request
 * @param expect
 * @param setup
 */
export function view({ request, expect, setup }: TestConfig): void {

    it('should return 200 for the / route when NODE_ENV=development', async () => {
        const server = setup({ env: { NODE_ENV: 'development', SERVER_PORT: '3000' } });
        const response = await request(server).get('/');

        expect(response).to.have.status(200);
    });

    it('should return 200 for the / route when NODE_ENV=production', async () => {
        const server = setup({ env: { NODE_ENV: 'production', SERVER_PORT: '3000' } });
        const response = await request(server).get('/');

        expect(response).to.have.status(200);
    });
}
