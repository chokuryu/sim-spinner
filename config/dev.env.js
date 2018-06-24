'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

console.log('It is Dev.');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
