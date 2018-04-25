import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import '../../../test-helper';
import SecretFriendService from '../../../../src/app/components/secretfriend/secretfriend.service';

chai.use(sinonChai);

describe('SecretFriendService', () => {
  describe('Smoke test', () => {
    it('should exist SecretFriendService', () => {
      expect(SecretFriendService).to.be.exist;
    });
    it('should call new instance', (done) => {
      inject(($http) => {
        const service = new SecretFriendService($http);
        expect(service).to.be.exist;
        done();
      });
    });
  });

  describe('test methods', () => {

    let http;
    let service;

    beforeEach(() => {
      inject(($http) => {
        http = $http;
        service = new SecretFriendService(http);
      });
    });

    describe('resend method', () => {
      it('should call method', (done) => {
        const stub = sinon.stub(http, 'post');
        stub.resolves({data: {test: 1}, status: 200 });
        const promise = service.resend({});
        promise.then(result => {
          expect(result).to.include({test: 1});
          stub.restore();
          done();
        }).catch(err => done(err));
      });
    });
  });

});
