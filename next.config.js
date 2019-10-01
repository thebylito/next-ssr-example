'use strict';

const next = require('next');

// next.config.js
module.exports = {
  test: /\.js(\?[^?]*)?$/,
  loader: 'babel-loader',
  include: [
   './next/dist/pages',
  ],
  query: {
    cacheDirectory: true,
    sourceMaps: 'both',
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-object-rest-spread']
  }
};
