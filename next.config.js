/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.alias.services = path.join(__dirname, 'next/services');
    config.resolve.alias.appStore = path.join(__dirname, 'next/appStore');
    config.resolve.alias.hooks = path.join(__dirname, 'next/hooks');
    config.resolve.alias.components = path.join(__dirname, 'next/components');
    config.resolve.alias.utils = path.join(__dirname, 'next/utils');
    config.resolve.alias.lib = path.join(__dirname, 'next/lib');
    return config;
  },
};
