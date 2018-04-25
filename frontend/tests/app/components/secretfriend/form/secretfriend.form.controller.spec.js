import chai, { expect } from 'chai';
import '../../../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SecretFriendFormController from '../../../../../src/app/components/secretfriend/form/secretfriend.form.controller';
import SecretFriendService from '../../../../../src/app/components/secretfriend/secretfriend.service';
import PeopleService from '../../../../../src/app/components/people/people.service';

chai.use(sinonChai);

describe('SecretFriendFormController', () => {
  describe('Smoke test', () => {
    it('should exist SecretFriendFormController', () => {
      expect(SecretFriendFormController).to.be.exist;
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
    let peopleService;
    let findPeople;

    beforeEach((done) => {
      inject(($controller,  $rootScope, $compile, $http) => {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        compile = $compile;
        state = { go: sinon.stub(), params: {} };
        http = $http;
        service = new SecretFriendService($http);
        peopleService = new PeopleService($http);
        findPeople = sinon.stub(peopleService, 'find');
        findPeople.resolves({docs: [{id: '1', name: 'teste'}, {id: '2', name: 'teste2'}]});
        toast = {
          create: sinon.stub(),
          warning: sinon.stub(),
          success: sinon.stub(),
        };
        controler = new SecretFriendFormController(scope, state, toast, peopleService, service, rootScope);
        done();
      });
    });

    afterEach(() => {
      findPeople.restore();
    });

    describe('test methods', () => {
      describe('save method', () => {
        it('should call with form and select all people', (done) => {
          const template = '<form name="test"><input type="text" name="name" ng-model="name"/></form>';
          compile(template)(scope);
          scope.selectAll = true;
          controler.checkAll();
          const stub = sinon.stub(http, 'post');
          stub.resolves({status: 200, data: {test: true}});
          toast.success.callsFake(() => {
            expect(true).to.be.true;
            done();
          });
          controler.save(scope.test);
        });

        it('should call with form and not select people', (done) => {
          const template = '<form name="test"><input type="text" name="name" ng-model="name"/></form>';
          compile(template)(scope);
          toast.warning.callsFake(() => {
            expect(true).to.be.true;
            done();
          });
          controler.save(scope.test);
        });
      });

      describe('cancel method', () => {
        it('should call method', () => {
          controler.cancel();
          expect(state.go.called).to.be.true;
        });
      });

      describe('checked method', () => {
        it('should call method', () => {
          let checked = controler.checked({id: '1'});
          expect(checked).to.be.false;
          scope.selectAll = true;
          controler.checkAll();
          checked = controler.checked({id: '1'});
          expect(checked).to.be.true;
        });
      });
    });

  });

});
