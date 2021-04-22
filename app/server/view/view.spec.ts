import { TestConfig } from '../spec';

const { expect, request, setup } = TestConfig;

describe('View Integration Specification', () => {

    it('should return 200 for the / route when NODE_ENV=development', async () => {
        const server = setup({ env: { NODE_ENV: 'development', PORT: '3000' } });
        const response = await request(server).get('/');

        expect(response).to.have.status(200);
    });

    it('should return 200 for the / route when NODE_ENV=production', async () => {
        const server = setup({ env: { NODE_ENV: 'production', PORT: '3000' } });
        const response = await request(server).get('/');

        expect(response).to.have.status(200);
    });

});
