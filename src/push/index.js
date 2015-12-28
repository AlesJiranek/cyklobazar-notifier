require('babel-register');
require('dotenv').load();

if (!process.env.PUSHOVER_USER || !process.env.PUSHOVER_TOKEN)
  throw new Error('Some of environment variables is not set. You have to set both PUSHOVER_USER and PUSHOVER_TOKEN variables.');

require('./push');
