import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import sinonStubsPromise from 'sinon-stub-promise';
import { mockReq, mockRes } from 'sinon-express-mock';
import DatabaseMock from '../utils/database.mock';
import PersonController from '../../src/controllers/person.controller';
import PersonModel from '../../src/models/person.model';
import Utils from '../utils/utils';

chai.use(sinonChai);
sinonStubsPromise(sinon);

describe('PersonController', () => {

  describe('Smoke tests', () => {
    it('should exist PersonController', () => {
      expect(PersonController).to.be.exist;
    });

    it('should exist method index in PersonController', () => {
      expect(PersonController).to.respondTo('index');
    });

    it('should exist method create in PersonController', () => {
      expect(PersonController).to.respondTo('create');
    });

    it('should exist method update in PersonController', () => {
      expect(PersonController).to.respondTo('update');
    });

    it('should exist method delete in PersonController', () => {
      expect(PersonController).to.respondTo('delete');
    });

  });

  describe('Test methods', () => {

    let req;
    let res;

    before(DatabaseMock.start);

    after((done) => {
      Utils.bindCatch(PersonModel.remove({}), done)
        .then(() => {
          DatabaseMock.end(done);
        });
    });

    beforeEach(() => {
      req = new mockReq();
      res = new mockRes();
    });

    describe('index', () => {
      it('should call with no params', (done) => {
        new PersonController().index(req, res);
        res.json.callsFake((result) => {
          expect(result).to.be.instanceOf(Array);
          done();
        });
      });

      it('should call with id param', (done) => {
        const personModel = new PersonModel({
          name: 'teste3',
          email: 'teste3@gmail.com'
        });
        Utils.bindCatch(personModel.save(), done)
          .then((person) => {
            person = person.toJSON();
            req = new mockReq({params: {id: person.id}});
            new PersonController().index(req, res);
            res.json.callsFake((result) => {
              expect(result).to.include({ name: 'teste3', email: 'teste3@gmail.com' });
              done();
            });
          });
      });
    });

    describe('create', (done) => {
      it('should call with body params {name: "teste", email: "teste@gmail.com"}', (done) => {
        req = new mockReq({body: {name: "teste", email: "teste@gmail.com"}});
        new PersonController().create(req, res);
        res.json.callsFake((person) => {
          expect(person).to.include({name: "teste", email: 'teste@gmail.com'});
          done();
        });
      });

      it('should call with duplicate email', (done) => {
        req = new mockReq({body: {name: "teste", email: "teste2@gmail.com"}});
        new PersonController().create(req, res);
        res.json.callsFake((person) => {
          const res2 = new mockRes();
          new PersonController().create(req, res2);
          res2.json.callsFake((err) => {
            expect(err.error).to.be.true;
            done();
          });
        });
      });
    });


    describe('update', () => {
      it('should call with params {name: "teste5", email: "teste5@gmail.com"}', (done) => {
        Utils.bindCatch(new PersonModel({name: "teste4", email: "teste4@gmail.com"}).save(), done)
          .then((person) => {
            person = person.toJSON();
            req = new mockReq({params: {id: person.id}, body: {name: 'teste5', email: "teste5@gmail.com"}});
            new PersonController().update(req, res);
            res.json.callsFake((personUpdate) => {
              expect(personUpdate).to.include({name: 'teste5', email: "teste5@gmail.com"});
              done();
            });
          });
      });
    });

    describe('delete', () => {
      it('should delete any person', (done) => {
        Utils.bindCatch(new PersonModel({name: "teste6", email: "teste6@gmail.com"}).save(), done)
          .then((person) => {
            person = person.toJSON();
            req = new mockReq({ params: {id: person.id}});
            new PersonController().delete(req, res);
            res.sendStatus.callsFake((status) => {
              expect(status).to.be.eqls(200);
              done();
            });
          });
      });
    });

  });

});
