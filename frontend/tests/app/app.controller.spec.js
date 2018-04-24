import { expect } from 'chai';
import '../test-helper';
import app from '../../src/app/app';
import controller from '../../src/app/app.controller';

describe('app', () => {

  describe('AppController', () => {
    let controler;
    let rootScope;

    beforeEach(() => {
      ngModule(app);
      inject(($controller,  $rootScope) => {
        rootScope = $rootScope.$new();
        controler = $controller(controller, {$rootScope: rootScope});
      });
    });

    it('should exist controller', () => {
      expect(controler).to.be.exist;
    });

    it('should change progress in rootScope', () => {
      rootScope.progress = true;
      rootScope.$apply();
      expect(controler.progress).to.be.true;
    });
  });
});
