import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import '../../../../test-helper';
import '../../../../../src/app/app';

chai.use(sinonChai);

describe('PersonFormModule', () => {
  it('should exist module', () => {
    expect(angular.module('people')).to.be.exist;
  });
  it('should call personform route', (done) => {
    ngModule('MyApp');
    ngModule('people');
    inject(($state, $rootScope) => {
      $state.go('personform');
      $rootScope.$digest();
      expect($state.current.name).to.be.eql('personform');
      done();
    });
  });
});
