import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";
import sinonStubsPromise from "sinon-stub-promise";
import DatabaseMock from '../utils/database.mock';
import PersonModel from '../../src/models/person.model';
import SecretFriendModel from '../../src/models/secret.friend.model';
import Utils from '../utils/utils';
import { notDeepEqual } from 'assert';

chai.use(sinonChai);
sinonStubsPromise(sinon);

describe('SecretFriendModel', () => {
  describe('Smoke tests', () => {
    it('should exist SecretFriendModel', () => {
      expect(SecretFriendModel).to.be.exist;
    });

    it('should exist generate method', () => {
      expect(SecretFriendModel).itself.to.respondsTo('generate');
    });
  });

  describe('execute methods', () => {
    before((done) => {
      DatabaseMock.start(done);
    });

    after((done) => {
      DatabaseMock.end(done);
    });

    describe('generate method', () => {

      beforeEach((done) => {
        PersonModel.remove(() => done());
      });

     it('should call generate without any person on the database', (done) => {
       SecretFriendModel.generate('Teste', new Date())
        .then(result => {
          expect(result).to.be.null;
          done();
        }).catch(err => {
          expect(err).to.be.exist;
          done();
        })
     });

     it('should call generate when PersonModel.findRandon return error', (done) => {
      const stub = sinon.stub(PersonModel, 'findRandom');
      stub.callsFake((conditions, fields, options, callback) => {
        callback(new Error('Fake Error'));
      });
      SecretFriendModel.generate('Teste', new Date())
      .then(result => {
        expect(result).to.be.null;
        stub.restore();
        done();
      }).catch(err => {
        expect(err).to.be.exist;
        stub.restore();
        done();
      });
    });

     it('should call generate with two person registered on the database', (done) => {
      Utils.bindCatch(Promise.all([
            new PersonModel({name: 'teste', email: 'teste@gmail.com'}).save()
          , new PersonModel({name: 'teste2', email: 'teste2@gmail.com'}).save()
        ]), done)
        .then(() => {
          SecretFriendModel.generate('Teste', new Date())
          .then(result => {
            expect(result).to.be.exist;
            expect(result.name).to.be.eql('Teste');
            expect(result.drawn.length).to.be.eql(2);
            expect(result.toJSON()).to.be.exist;
            expect(result.toJSON()).to.not.ownProperty('drawn');
            done();
          }).catch(err => {
            expect(err).not.to.be.exist;
            done();
          });
        });
    });
    });
  });
});
