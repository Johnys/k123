import chai, { expect } from 'chai';
import '../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import CrudController from '../../../src/app/common/crud.controller';

chai.use(sinonChai);

describe('CrudController', () => {
  describe('Smoke test', () => {
    it('should exist CrudController', () => {
      expect(CrudController).to.be.exist;
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
        controler = new CrudController(toast, scope, $rootScope);
      });
    });

    describe('test methods', () => {
      describe('persist method', () => {
        it('should call with params form resolved promise and message', (done) => {
          const promise = new Promise((resolve, reject) => resolve({}));
          toast.success.callsFake((params) => {
            expect(params).to.be.eql('Message');
            done();
          });
          const template = '<form name="test"><input type="text" name="name" ng-model="name"/></form>';
          compile(template)(scope);
          controler.persist(scope.test, promise, 'Message');
        });
      });
    });

  });

});
