import * as chai from 'chai';
import request, { server } from '../utils/server.mock';
import constants from '../../src/config/constants';

const expect = chai.expect;

describe('GET /', () => {

  after(() => {
    server.close();
  });

  describe('#200', () => {
    it('should return json', (done) => {
      request().get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.eql('application/json');
          done();
        });
    });

    it('should return the API version', (done) => {
      request().get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.version).to.eql(constants.version);
          done();
        });
    });
  });
});
