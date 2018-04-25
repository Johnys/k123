import chai, { expect } from 'chai';
import '../../../test-helper';
import PeopleService from '../../../../src/app/components/people/people.service';

describe('PeopleService', () => {
  describe('Smoke test', () => {
    it('should exist PeopleService', () => {
      expect(PeopleService).to.be.exist;
    });
    it('should call new instance', (done) => {
      inject(($http) => {
        const service = new PeopleService($http);
        expect(service).to.be.exist;
        done();
      });
    });
  });

});
