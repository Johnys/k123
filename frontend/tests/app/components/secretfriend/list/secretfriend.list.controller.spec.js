import chai, { expect } from 'chai';
import '../../../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SecretFriendListController from '../../../../../src/app/components/secretfriend/list/secretfriend.list.controller';
import SecretFriendService from '../../../../../src/app/components/secretfriend/secretfriend.service';

chai.use(sinonChai);

describe('SecretFriendListController', () => {
  describe('Smoke test', () => {
    it('should exist SecretFriendListController', () => {
      expect(SecretFriendListController).to.be.exist;
    });
  });

  describe('test methods', () => {
    let controller;
    let rootScope;
    let scope;
    let toast;
    let compile;
    let service;
    let state;
    let http;
    let httpGet;

    beforeEach(() => {
      inject(($controller,  $rootScope, $compile, $http) => {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        compile = $compile;
        state = { go: sinon.stub(), params: {} };
        http = $http;
        httpGet = sinon.stub(http, 'get');
        httpGet.resolves({status: 200, data: {docs: [], total: 0, page: 1, limit: 10}});
        service = new SecretFriendService($http);
        toast = {
          create: sinon.stub(),
          warning: sinon.stub(),
          success: sinon.stub(),
        };
        controller = new SecretFriendListController(scope, rootScope, state, toast, service);
      });
    });

    afterEach(() => {
      httpGet.restore();
    });

    describe('new method', () => {
      it('should call method', () => {
        controller.new();
        expect(state.go.called).to.be.true;
      });
    });

    describe('find method', () => {
      it('should call method', (done) => {
        scope.search = 'teste';
        const stubProgress = sinon.stub(controller, 'progress');
        stubProgress.callsFake((enable) => {
          if(!enable){
            expect(scope).to.deep.include({secretsFriends :[], total: 0, page: 1, limit: 10});
            stubProgress.restore();
            done();
          }
        })
        controller.find();
      });

      it('should call find method when search change', (done) => {
        const stub = sinon.stub(controller, 'find');
        stub.callsFake(() => {
          expect(true).to.be.true;
          stub.restore();
          done();
        });
        scope.search = 'teste';
        scope.$apply();
      });

    });

    describe('resend method', () => {
      it('should call method', (done) => {
        const stub = sinon.stub(http, 'post');
        stub.resolves({status: 200, data: {test: true}});
        toast.success.callsFake(() => {
          expect(true).to.be.true;
          done();
        });
        controller.resend({});
      });
    });


  });

});
