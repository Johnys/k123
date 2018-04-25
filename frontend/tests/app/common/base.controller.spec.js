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
    let compile;

    beforeEach(() => {
      inject(($controller,  $rootScope, $compile) => {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        compile = $compile;
        toast = {
          create: sinon.stub(),
          warning: sinon.stub(),
          success: sinon.stub(),
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
      it('call with promise reject', (done) => {
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

    describe('bindSuccessResult method', () => {
      it('call with promise resolve with argument {} and message', (done) => {
        const promise = new Promise((resolve, reject) => resolve({}));
        toast.success.callsFake((params) => {
          expect(params).to.be.eql('Mensagem');
          done();
        });
        controler.bindSucessResult(promise, 'Mensagem');
      });

      it('call with promise resolve with argument {error: true, message: "Erro"} and message', (done) => {
        const promise = new Promise((resolve, reject) => resolve({error: true, message: 'Erro'}));
        toast.create.callsFake((params) => {
          expect(params.content).to.be.eql('Ops....');
          done();
        });
        controler.bindSucessResult(promise, 'Mensagem');
      });

      it('call with promise resolve with argument {error: true, message: "Erro", errors: {name: {message: "Erro"}}} and message', (done) => {
        const promise = new Promise((resolve, reject) => resolve({error: true, message: 'Erro', errors: {name: {message: "Erro"}}}));
        toast.create.callsFake((params) => {
          expect(params.content).to.be.eql('Ops....');
        });
        const template = '<form name="teste"><input type="text" name="name" ng-model="name"/></form>';
        compile(template)(scope);
        controler.bindSucessResult(promise, 'Mensagem', scope.teste)
          .then(() => {
            expect(scope.teste.$valid).to.be.false;
            done();
          });
      });
    });

    describe('processPromise', () => {
      it('call with resolved promise', (done) => {
        const promise = new Promise((resolve, reject) => resolve({}));
        toast.success.callsFake((params) => {
          expect(params).to.be.eql('Mensagem');
          done();
        });
        controler.processPromise(promise, 'Mensagem');
      });

      it('call with rejected promise', (done) => {
        const promise = new Promise((resolve, reject) => reject({error: true, message: 'Mensagem'}));
        toast.create.callsFake((params) => {
          expect(params.content).to.be.eql('Mensagem');
          done();
        });
        controler.processPromise(promise, 'Mensagem');
      });
    });

    describe('clearApiErros', () => {
      it('call with form', () => {
        const template = '<form name="test"><input type="text" name="name" ng-model="name"/></form>';
        compile(template)(scope);
        scope.test.name.$setValidity('api', false);
        controler.clearApiErros(scope.test);
        expect(scope.test.name.$valid).to.be.true;
      });
    });

  });

});
