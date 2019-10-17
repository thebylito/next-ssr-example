/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.alias.services = path.join(__dirname, 'next/services');
    config.resolve.alias.appStore = path.join(__dirname, 'next/appStore');
    return config;
  },
};
