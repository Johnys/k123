import { expect } from 'chai';
import '../test-helper';
import app from '../../src/app/app';
import controller from '../../src/app/app.controller';

describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl;

    beforeEach(() => {
      ngModule(app);
      inject(($controller) => {
        ctrl = $controller(controller, {});
      });
    });

    it('should exist controller', () => {
      expect(ctrl).to.be.exist;
    });
  });
});
