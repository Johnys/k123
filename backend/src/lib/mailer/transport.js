import nodemailer from 'nodemailer';
import constants from '../../config/constants';

const transports = [];

transports.push(nodemailer.createTransport({
  host: constants.mailer.host,
  from: constants.mailer.from,
  auth: {
    user: constants.mailer.user,
    pass: constants.mailer.password,
  },
}));

export default transports;
