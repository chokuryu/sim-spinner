'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const extended = require('./extended')

//
function all() {

  //
  const spinner = ora('building for production...')
  spinner.start()

  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err

    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err

      finish(stats)
    })

  })

};

all();


//
async function finish(stats) {

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))

  //
  // 追加処理
  //
  console.log('\n======[additional build]=====\n')
  console.log('start afterMake...')
  try {
    let result = await extended.afterMake({
      FAVICON_SOURCE: path.resolve(__dirname, '../favicon.ico'),
      FAVICON_OUTPUT: path.resolve(__dirname, '../dist/favicon.ico'),
    })
  } catch (err) {
    console.log('!!!! error at afterMake')
    console.error(err)
    return
  }
  console.log('end afterMake...')

}
