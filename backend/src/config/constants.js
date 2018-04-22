import path from 'path';
import merge from 'lodash/merge';
import pkg from '../../package.json';

// Default configuations applied to all environments
const defaultConfig = {
  env: process.env.NODE_ENV || 'development',
  get envs() {
    return {
      test: (process.env.NODE_ENV || 'development').trim() === 'test',
      development: (process.env.NODE_ENV || 'development').trim() === 'development',
      production: (process.env.NODE_ENV || 'development').trim() === 'production',
    };
  },
  router: {
    secure_path: /^[/]secure.*/,
  },
  version: pkg.version,
  root: path.normalize(`${__dirname}/../../..`),
  port: process.env.PORT || 4567,
  ip: process.env.IP || '0.0.0.0',
  apiPrefix: '', // Could be /api/resource or /api/v2/resource
  /**
   * MongoDB configuration options
   */
  mongo: {
    seed: true,
    options: {
      db: {
        safe: true,
      },
    },
  },
  mailer: {
    host: 'smtp.gmail.com',
    from: 'jjohnys@gmail.com',
    user: 'jjohnys@gmail.com',
    password: 'jjrwvftwlvbgihhk',
  },
};

// Environment specific overrides
const environmentConfigs = {
  development: {
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://userproduction:asdfa7129873asdf2313@ds247759.mlab.com:47759/secret-friend',
    },
  },
  test: {
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://userproduction:asdfa7129873asdf2313@ds247759.mlab.com:47759/secret-friend',
    },
  },
  production: {
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://userproduction:asdfa7129873asdf2313@ds247759.mlab.com:47759/secret-friend',
    },
  },
};

// Recursively merge configurations
export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
