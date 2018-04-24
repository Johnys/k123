import { expect } from 'chai';
import '../test-helper';
import AppComponent from '../../src/app/app.component';

describe('AppComponent', () => {
  describe('Smoke test', () => {
    it('should be exist', () => {
      expect(AppComponent).to.be.exist;
      expect(AppComponent).to.be.a('function');
    });
  });
  describe('Call the AppComponent', () => {
    it('should call AppComponent', () => {
      const app = new AppComponent();
      expect(app).to.be.exist;
    });
  });
});
