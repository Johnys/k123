import { expect } from 'chai';
import DatabaseMock from '../utils/database.mock';
import PersonModel from '../../src/models/person.model';
import Constants from '../../src/config/constants';
import Utils from '../utils/utils';

describe('PersonModel', () => {
  describe('Smoke tests', () => {
    it('should exist PersonModel', () => {
      expect(PersonModel).to.be.exist;
    });

    it('should exist search method', () => {
      expect(PersonModel).itself.to.respondsTo('search');
    });
  });

  describe('execute methods', () => {
    before((done) => {
      DatabaseMock.start(done);
    });

    after((done) => {
      DatabaseMock.end(done);
    });

    describe('search method', () => {

      let person;

      before((done) => {
        let personModel = new PersonModel({
          name: 'Johnys',
          email: 'jjohnys@gmail.com'
        });
        Utils.bind(personModel.save(), done, (result) => {
          person = result.toJSON();
        });
      });

      it('should execute search with id', (done) => {
        Utils.bind(PersonModel.search({ id: person.id }), done, (result) => {
            expect(result).to.be.exist;
            expect(result.toJSON().id).to.be.eql(person.id);
          });
      });

      it('should execute search with name', (done) => {
      Utils.bind(PersonModel.search({ name: /.*joh.*/i }), done, (result) => {
          expect(result).to.be.exist;
          expect(result.length).not.to.be.eql(0);
        });
      });
    });
  });
});
