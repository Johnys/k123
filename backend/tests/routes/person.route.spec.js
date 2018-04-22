import { expect } from 'chai';
import DatabaseMock from '../utils/database.mock';
import app from '../utils/server.mock';

describe('/person', () => {

  after((done) => {
    app.closeAll();
    DatabaseMock.end(done)
  });

  before((done) => {
    DatabaseMock.start(done);
  });

  describe('GET /person', () => {
    it('should return json', (done) => {
      try{
        app.get('/person')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.type).to.eql('application/json');
            done();
          });

  }catch(err){
    console.log(err);
    done();
  }
});
  });
});
