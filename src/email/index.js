require('babel-register');
require('dotenv').load();

if (!process.env.NOTIFICATION_EMAIL)
  throw new Error('Some of environment variables is not set. You have to set NOTIFICATION_EMAIL variable.');

require('./email');
