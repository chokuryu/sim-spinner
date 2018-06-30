// extended.js
'use strict';
const path = require('path')
const MyFile = require('./MyFile')

const extended = {};
module.exports = extended;

extended.preMake = function(option) {

  //console.log(FAVICON_SOURCE)

  return Promise.resolve()
  .then(arg => copyFavicon(option))
  .then(arg => {
    return {
      succeeded: true
    };
  })

};

// favicon のコピー処理
//
function copyFavicon(option) {

  const FAVICON_SOURCE = option.FAVICON_SOURCE || 'lfjsiejflkjsihefekl'
  const FAVICON_OUTPUT = option.FAVICON_OUTPUT || 'lfjsiejflkjsihefekl'

  return MyFile.findFiles(FAVICON_SOURCE)
  .then(files => {
    //console.log(files)
    if (files.length !== 1) {
      return null
    }
    return MyFile.read(FAVICON_SOURCE)
  })
  .then(data => {
    if (!data) {
      console.log('Nothing favicon.ico in project top directory.')
      return
    }
    return MyFile.write(FAVICON_OUTPUT, data)
  })
}
