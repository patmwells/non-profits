import type { TestConfig } from '@server/server.spec';

/**
 *
 * @param request
 * @param expect
 * @param setup
 */
export function view({ request, expect, setup }: TestConfig): void {

    it('should return 200 for the / route when NODE_ENV=development', () => {
        const server = setup({ env: { NODE_ENV: 'development', SERVER_PORT: '3000' } });

        return request(server).get('/').then((response) => {
            expect(response).to.have.status(200);
        });
    });

    it('should return 200 for the / route when NODE_ENV=production', () => {
        const server = setup({ env: { NODE_ENV: 'production', SERVER_PORT: '3000' } });

        return request(server).get('/').then((response) => {
            expect(response).to.have.status(200);
        });
    });
}
