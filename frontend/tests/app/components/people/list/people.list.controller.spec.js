import chai, { expect } from 'chai';
import '../../../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import PeopleListController from '../../../../../src/app/components/people/list/people.list.controller';
import PeopleService from '../../../../../src/app/components/people/people.service';

chai.use(sinonChai);

describe('PeopleListController', () => {
  describe('Smoke test', () => {
    it('should exist PeopleListController', () => {
      expect(PeopleListController).to.be.exist;
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
    let httpDelete;

    beforeEach(() => {
      inject(($controller,  $rootScope, $compile, $http) => {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        compile = $compile;
        state = { go: sinon.stub(), params: {} };
        http = $http;
        httpGet = sinon.stub(http, 'get');
        httpGet.resolves({status: 200, data: {docs: [], total: 0, page: 1, limit: 10}});
        httpDelete = sinon.stub(http, 'delete');
        httpDelete.resolves({status: 200, data: {}});
        service = new PeopleService($http);
        toast = {
          create: sinon.stub(),
          warning: sinon.stub(),
          success: sinon.stub(),
        };
        controller = new PeopleListController(scope, state, toast, service, rootScope);
      });
    });

    afterEach(() => {
      httpGet.restore();
      httpDelete.restore();
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
            expect(scope).to.deep.include({people:[], total: 0, page: 1, limit: 10});
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

    describe('edit method', () => {
      it('should call method', () => {
       controller.edit({});
       expect(state.go.called).to.be.true;
      });
    });

    describe('remove method', () => {
      it('should call method', (done) => {
        const confirm = sinon.stub(window, 'confirm');
        confirm.callsFake(() => true);
        const stub = sinon.stub(controller, 'find');
        stub.callsFake(() => {
          expect(true).to.be.true;
          stub.restore();
          done();
        });
        controller.remove({});
      });
    });

  });

});
