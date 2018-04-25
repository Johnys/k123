import chai, { expect } from 'chai';
import '../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import CrudService from '../../../src/app/common/crud.service';

chai.use(sinonChai);

describe('CrudService', () => {
  describe('Smoke test', () => {
    it('should exist CrudService', () => {
      expect(CrudService).to.be.exist;
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
        service = new CrudService(http, '/api');
      });
    });

    const testMethod = (method, data, httpMethod, done) => {
      const stub = sinon.stub(http, httpMethod);
      stub.resolves({data: {test: 1}, status: 200 });
      const promise = service[method](data);
      promise.then(result => {
        expect(result).to.include({test: 1});
        stub.restore();
        done();
      }).catch(err => done(err));
    }

    it('should call save method', (done) => {
      testMethod('save', {}, 'post', done);
    });

    it('should call update method', (done) => {
      testMethod('update', {}, 'put', done);
    });

    it('should call remove method', (done) => {
      testMethod('remove', {}, 'delete', done);
    });

    it('should call find method', (done) => {
      testMethod('find', {}, 'get', done);
    });

  });

});
