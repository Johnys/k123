import chai, { expect } from 'chai';
import '../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import BaseService from '../../../src/app/common/base.service';

chai.use(sinonChai);

describe('BaseService', () => {
  describe('Smoke test', () => {
    it('should exist BaseService', () => {
      expect(BaseService).to.be.exist;
    });
  });

  describe('test methods', () => {
    let http;
    let service;

    before(() => {
      global.__CONFIG = {api: 'http://teste.com.br'}
    });

    beforeEach(() => {
      inject(($http) => {
        http = $http;
        service = new BaseService(http, '/api');
      });
    });

    describe('getURI', () => {
      it('should call method without params', () => {
        const uri = service.getURI();
        expect(uri).to.be.eql('http://teste.com.br/api');
      });

      it('should call method with param 10', () => {
        const uri = service.getURI(10);
        expect(uri).to.be.eql('http://teste.com.br/api/10');
      });
    });

    describe('threatPromisse', () => {
      it('should call method with resolve promise with arg {status: 200, data: {teste: true}}', (done) => {
        const promise = new Promise((resolve, reject) => {
          resolve({status: 200, data: {teste: true}})
        });
        service.threatPromisse(promise, (data) => {
          expect(data).to.include({teste: true});
          done();
        }, () => {
          throw new Error('Not call yet');
        })
      });

      it('should call method with resolve promise with arg {status: 500, data: {teste: true}}', (done) => {
        const promise = new Promise((resolve, reject) => {
          resolve({status: 500, data: {teste: true}})
        });
        service.threatPromisse(promise, (data) => {
          throw new Error('Not call yet');
        }, (err) => {
          expect(err.error).to.be.true;
          expect(err.message).to.be.exist;
          done();
        })
      });

      it('should call method with reject promise with arg {error: true}', (done) => {
        const promise = new Promise((resolve, reject) => {
          reject({error: true})
        });
        service.threatPromisse(promise, (data) => {
          throw new Error('Not call yet');
        }, (err) => {
          expect(err).to.include({error: true});
          done();
        })
      });
    });


  });

});
