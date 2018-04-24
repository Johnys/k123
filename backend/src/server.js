import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';
import yes from 'yes-https';

import routes from './routes';
import Constants from './config/constants';
import MailServer from './lib/mailer/mailer.server';

const app = express();
app.use(helmet());

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/public', express.static(`${__dirname}/public`));
app.use(Constants.apiPrefix, routes);
if (!Constants.envs.test) {
  console.log('Subiu servidor de email');
  MailServer.init();
  app.use(yes());
}

const server = app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export { server, app };
