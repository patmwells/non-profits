import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

export const { expect, request } = chai;
