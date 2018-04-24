import chai, { expect } from 'chai';
import '../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import BaseController from '../../../src/app/common/base.controller';

chai.use(sinonChai);

describe('BaseController', () => {
  describe('Smoke test', () => {
    it('should exist BaseController', () => {
      expect(BaseController).to.be.exist;
    });
  });

  describe('test methods', () => {
    let controler;
    let rootScope;
    let scope;
    let toast;

    beforeEach(() => {
      inject(($controller,  $rootScope) => {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        toast = {
          create: sinon.stub(),
          warning: sinon.stub(),
        };
        controler = new BaseController(toast, scope, $rootScope);
      });
    });

    describe('progress method', () => {
      it('should call progress method', () => {
        controler.progress(true);
        rootScope.$digest();
        expect(rootScope.progress).to.be.true;
      });
    });

    describe('threatError', () => {
      it('should call with promise reject', (done) => {
        toast.create.callsFake((params) => {
          expect(params.content).to.be.eql('teste de mensagem');
          done();
        });
        const promise = new Promise((resolve, reject) => {
          reject({message: 'teste de mensagem'});
        });
        controler.threatError(promise);
      });
    });

  });

});
