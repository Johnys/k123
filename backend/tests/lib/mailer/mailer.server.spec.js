import { expect } from 'chai';
import DatabaseMock from '../../utils/database.mock';
import MailServer from '../../../src/lib/mailer/mailer.server';

describe('MailServer', () => {
  describe('Smoke test', () => {
    it('should exist MailServer', () => {
      expect(MailServer).to.be.exist;
    });

    it('should exist init method in MailServer', () => {
      expect(MailServer).itself.to.respondsTo('init');
    });
  });

  describe('execute methods', () => {

    before((done) => {
      DatabaseMock.start(done);
    });

    after((done) => {
      DatabaseMock.end(done);
    });

    describe('init method', () => {
      expect(MailServer.server).not.to.exist;
      MailServer.init();
      expect(MailServer.server).to.exist;
    });
  });
});
