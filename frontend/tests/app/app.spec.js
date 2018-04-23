import { expect } from 'chai';
import '../test-helper';
import app from '../../src/app/app';

describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl;

    beforeEach(() => {
      ngModule(app);
      inject(($controller) => {
        ctrl = $controller('AppCtrl', {});
      });
    });

    it('should contain the starter url', () => {
      expect(ctrl.url).to.be.eql('https://github.com/preboot/angular-webpack');
    });
  });
});
