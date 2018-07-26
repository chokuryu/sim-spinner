'use strict';

// dev server
// instead of npm script "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",

const config = require('../config')
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.conf.js');
const beforeCompile = require('./beforeCompile')

async function start() {

  // beforeCompile
  //
  const result = await beforeCompile()
  if (result.hasError) return process.exit(1)

  // webpack
  //
  const setting = await webpackConfig
  const compiler = Webpack(setting);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    inline: true,
    stats: 'errors-only',
  });
  const server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(config.dev.port, config.dev.host, () => {

    console.log(`...Starting server on http://${config.dev.host}:${config.dev.port}`);

  });

}

start()
