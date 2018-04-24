import nodemailer from 'nodemailer';
import mockTransport from 'nodemailer-mock-transport';
import constants from '../../config/constants';

const transports = [];

if (constants.envs.test) {
  transports.push(mockTransport({}));
} else {
  transports.push(nodemailer.createTransport({
    host: constants.mailer.host,
    from: constants.mailer.from,
    auth: {
      user: constants.mailer.user,
      pass: constants.mailer.password,
    },
  }));
}

export default transports;
