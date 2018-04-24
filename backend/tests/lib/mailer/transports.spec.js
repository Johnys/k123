import { expect } from 'chai';
import transports from '../../../src/lib/mailer/transport';
import constants from '../../../src/config/constants';

describe('transports', () => {
  describe('Smoke tests', () => {
    it('should exist transports', () => {
      expect(transports).to.be.exist;
      expect(transports).to.be.instanceOf(Array);
    });
  });

  describe('should loading transport', () => {
    it('should NODE_ENV = development', () => {
      const env = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      delete require.cache[require.resolve('../../../src/lib/mailer/transport.js')]
      const transp = require('../../../src/lib/mailer/transport.js');
      expect(transp.default).to.be.exist;
      expect(transp.default).to.be.instanceof(Array);
      expect(transp.default.length).to.be.eql(1);
      expect(transp.default[0].options.host).to.be.eql(constants.mailer.host);
      process.env.NODE_ENV = env;
      delete require.cache[require.resolve('../../../src/lib/mailer/transport.js')]
    });


    it('should NODE_ENV = test', () => {
      const env = process.env.NODE_ENV;
      process.env.NODE_ENV = 'test';
      delete require.cache[require.resolve('../../../src/lib/mailer/transport.js')]
      const transp = require('../../../src/lib/mailer/transport.js');
      expect(transp.default).to.be.exist;
      expect(transp.default).to.be.instanceof(Array);
      expect(transp.default.length).to.be.eql(1);
      process.env.NODE_ENV = env;
      delete require.cache[require.resolve('../../../src/lib/mailer/transport.js')]
    });
  });
});
