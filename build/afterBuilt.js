'use strict';
const path = require('path')
const MyFile = require('./MyFile')

module.exports = function(option) {

  console.log('\n======[additional build]=====\n')
  console.log('start afterBuilt...')

  const result = {
    hasError: false
  }

  return Promise.resolve()
  .then(arg => copyFavicon(option))
  .catch((err) => {
    console.log('!!!! error at afterBuilt')
    console.error(err)
    result.hasError = true
  })
  .then(arg => {
    console.log('end afterBuilt...')
    return result
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
