import chai, { expect } from 'chai';
import '../../test-helper';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import NavBarController from '../../../src/app/components/navbar/navbar.controller';

chai.use(sinonChai);

describe('NavBarController', () => {
  describe('Smoke test', () => {
    it('should exist NavBarController', () => {
      expect(NavBarController).to.be.exist;
    });
  });

  describe('test methods', () => {
    let controler;
    let scope;
    let state;

    beforeEach(() => {
      inject(($rootScope) => {
        scope = $rootScope.$new()
        state = { go: sinon.stub() }
        controler = new NavBarController(scope, state);
      });
    });

    describe('test methods', () => {
      describe('goto method', () => {
        it('should call with state test', () => {
          const nextState = 'test';
          state.go.callsFake((state) => {
            expect(state).to.be.eql(nextState);
          });
          controler.goto(nextState);
          expect(scope.currentState).to.be.eql(nextState);
        });
      });

      describe('active method', () => {
        it('should call with page test and window with has #/test', () => {
          window.location.hash = "#/test";
          const classActive = controler.active('test');
          expect(classActive).to.be.eql('active');
        });
      });
    });

  });

});
