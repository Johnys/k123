import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubsPromise from 'sinon-stub-promise';
import Constants from '../src/config/constants';
import MailServer from '../src/lib/mailer/mailer.server';

chai.use(sinonChai);
sinonStubsPromise(sinon);

describe('Test server.js', () => {

  it('should call method init from MailServer when init server', () => {
    let stub = sinon.stub(MailServer, 'init');
    process.env.NODE_ENV = 'development';
    delete require.cache[require.resolve('../src/server.js')]
    const app = require('../src/server.js');
    process.env.NODE_ENV = 'test';
    expect(stub).to.be.called;
    stub.restore();
    app.server.close();
  });

});
