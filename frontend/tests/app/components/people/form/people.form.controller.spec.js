import chai, { expect } from 'chai';
import '../../../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import PeopleFormController from '../../../../../src/app/components/people/form/person.form.controller';
import PeopleService from '../../../../../src/app/components/people/people.service';

chai.use(sinonChai);

describe('PeopleFormController', () => {
  describe('Smoke test', () => {
    it('should exist PeopleFormController', () => {
      expect(PeopleFormController).to.be.exist;
    });
  });

  describe('test methods', () => {
    let controler;
    let rootScope;
    let scope;
    let toast;
    let compile;
    let service;
    let state;
    let http;

    beforeEach(() => {
      inject(($controller,  $rootScope, $compile, $http) => {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        compile = $compile;
        state = { go: sinon.stub(), params: {} };
        http = $http;
        service = new PeopleService($http);
        toast = {
          create: sinon.stub(),
          warning: sinon.stub(),
          success: sinon.stub(),
        };
        controler = new PeopleFormController(scope, state, toast, service, rootScope);
      });
    });

    describe('test methods', () => {
      describe('save method', () => {
        it('should call with form', (done) => {
          const template = '<form name="test"><input type="text" name="name" ng-model="name"/></form>';
          compile(template)(scope);
          const stub = sinon.stub(http, 'post');
          stub.resolves({status: 200, data: {test: true}});
          toast.success.callsFake(() => {
            expect(true).to.be.true;
            done();
          });
          controler.save(scope.test);
        });
      });

      describe('update method', () => {
        it('should call with form', (done) => {
          const template = '<form name="test"><input type="text" name="name" ng-model="name"/></form>';
          compile(template)(scope);
          const stub = sinon.stub(http, 'put');
          stub.resolves({status: 200, data: {test: true}});
          toast.success.callsFake(() => {
            expect(true).to.be.true;
            done();
          });
          controler.update(scope.test);
        });
      });

      describe('cancel method', () => {
        it('should call method', () => {
          controler.cancel();
          expect(state.go.called).to.be.true;
        });
      });
    });

  });

});
