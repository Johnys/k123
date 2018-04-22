import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import sinonStubsPromise from 'sinon-stub-promise';
import { mockReq, mockRes } from 'sinon-express-mock';
import DatabaseMock from '../utils/database.mock';
import SecretFriendController from '../../src/controllers/secret.friend.controller';
import SecretFriendModel from '../../src/models/secret.friend.model';
import PersonModel from '../../src/models/person.model';;
import Utils from '../utils/utils';

chai.use(sinonChai);
sinonStubsPromise(sinon);

describe('SecretFriendController', () => {

  describe('Smoke tests', () => {
    it('should exist SecretFriendController', () => {
      expect(SecretFriendController).to.be.exist;
    });

    it('should exist method index in SecretFriendController', () => {
      expect(SecretFriendController).to.respondTo('index');
    });

    it('should exist method create in SecretFriendController', () => {
      expect(SecretFriendController).to.respondTo('create');
    });

    it('should exist method resendEmail in SecretFriendController', () => {
      expect(SecretFriendController).to.respondTo('resendEmail');
    });

  });

  describe('Test methods', () => {

    let req;
    let res;

    before(DatabaseMock.start);

    after(DatabaseMock.end);

    beforeEach((done) => {
      req = new mockReq();
      res = new mockRes();
      Utils.bind(Promise.all([PersonModel.remove({}), SecretFriendModel.remove({})]), done);
    });

    describe('index', () => {
      it('should call with no params', (done) => {
        new SecretFriendController().index(req, res);
        res.json.callsFake((result) => {
          expect(result).to.be.instanceOf(Array);
          done();
        });
      });

    });

    describe('create', (done) => {
      it('should call with body params {name: "Amigo secreto do servico", revelation_date: "31/12/2018"}', (done) => {
        req = new mockReq({body: {name: "Amigo secreto do servico", revelation_date: "31/12/2018"}});
        new SecretFriendController().create(req, res);
        res.json.callsFake((res) => {
          expect(res.error).to.be.true;
          done();
        });
      });

      it('should call with body params {name: "Amigo secreto do servico", revelation_date: "31/12/2018"} and persist two person in database', (done) => {
        Utils.bindCatch(Promise.all([new PersonModel({name: 'teste', email: 'teste@gmail.com'}).save(), new PersonModel({name: 'teste2', email: 'teste2@gmail.com'}).save()]))
          .then(() => {
            req = new mockReq({body: {name: "Amigo secreto do servico", revelation_date: "31/12/2018"}});
            new SecretFriendController().create(req, res);
            res.json.callsFake((res) => {
              expect(res).to.be.include({name: "Amigo secreto do servico", revelation_date: "31/12/2018"});
              done();
            });
          });
      });

      it('should call with body params {name: "Amigo secreto do servico", revelation_date: "31/12/2018"} and persist three person in database and choice two people for friend', (done) => {
        Utils.bindCatch(Promise.all([new PersonModel({name: 'teste', email: 'teste@gmail.com'}).save(),
          new PersonModel({name: 'teste2', email: 'teste2@gmail.com', }).save(),
          new PersonModel({name: 'teste3', email: 'teste3@gmail.com', }).save()]))
          .then((results) => {
            req = new mockReq({body: {name: "Amigo secreto do servico", revelation_date: "31/12/2018", people: [results[0].uuid, results[1].uuid]}});
            new SecretFriendController().create(req, res);
            res.json.callsFake((res) => {
              expect(res).to.be.include({name: "Amigo secreto do servico", revelation_date: "31/12/2018"});
              expect(res.drawns).to.be.eql(2);
              done();
            });
          });
      });

    });

    describe('resendEmail', () => {
      it('should call with id of generated secretfriend', (done) => {
        Utils.bindCatch(Promise.all([new PersonModel({name: 'teste', email: 'teste@gmail.com'}).save(), new PersonModel({name: 'teste2', email: 'teste2@gmail.com'}).save()]))
          .then(() => {
            req = new mockReq({body: {name: "Amigo secreto do servico", revelation_date: "31/12/2018"}});
            new SecretFriendController().create(req, res);
            res.json.callsFake((res) => {
              const req2 = new mockReq({params: {id: res.id}});
              const res2 = new mockRes();
              new SecretFriendController().resendEmail(req2, res2);
              res2.sendStatus.callsFake(status => {
                expect(status).to.be.eql(200);
                done();
              });
            });
          });
      });

      it('should call with no generated secretfriend', (done) => {
        req = new mockReq({params: {id: 'fackeid'}});
        new SecretFriendController().resendEmail(req, res);
        res.sendStatus.callsFake(status => {
          expect(status).to.be.eql(500);
          done();
        });
      });

      it('should call with error in loadDrawn', (done) => {
        const stub = sinon.stub(SecretFriendController.prototype, 'loadDrawn');
        stub.rejects(new Error('FackError'));
        Utils.bindCatch(Promise.all([new PersonModel({name: 'teste', email: 'teste@gmail.com'}).save(), new PersonModel({name: 'teste2', email: 'teste2@gmail.com'}).save()]))
          .then(() => {
            req = new mockReq({body: {name: "Amigo secreto do servico", revelation_date: "31/12/2018"}});
            new SecretFriendController().create(req, res);
            res.json.callsFake((res) => {
              const req2 = new mockReq({params: {id: res.id}});
              const res2 = new mockRes();
              new SecretFriendController().resendEmail(req2, res2);
              res2.sendStatus.callsFake(status => {
                expect(status).to.be.eql(500);
                stub.restore();
                done();
              });
            });
          });
      });
    });

  });

});
