import chai from 'chai';
import chaiHttp from 'chai-http';
import {app, server} from '../../src/server';

chai.use(chaiHttp);
const request = () => chai.request(app);

export default request;
export {server};
