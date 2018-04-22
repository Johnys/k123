import chai from 'chai';
import chaiHttp from 'chai-http';
import { app , server } from '../../src/server';

chai.use(chaiHttp);

const requester = chai.request(app).keepOpen();

requester.closeAll = () => {
  requester.close();
  server.close();
}

export default requester
