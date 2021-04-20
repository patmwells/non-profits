import { TestConfig } from './spec/config';
import { view } from './view/spec';
import { census } from './census/spec';

/**
 *
 */
describe('Server Specification', () => {

    view(TestConfig);

    census(TestConfig);
});
