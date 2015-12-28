require('babel-register');
require('dotenv').load();

if (!process.env.NOTIFICATION_EMAIL)
  throw new Error('Some of environment variables is not set. You have to set all of NOTIFICATION_EMAIL, PUSHOVER_USER and PUSHOVER_TOKEN variables');

require('./main');
