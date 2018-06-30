'use strict';
const fs     = require('fs');
const glob   = require('glob');
const path   = require('path');

let MyFile = {};
module.exports = MyFile;

//
MyFile.findFiles = function( pattern, option = {} ) {
  return new Promise(( resolve, reject )=> {
    glob( pattern, option, ( err, files )=> {
      if ( err ) reject( err );
      else resolve( files );
    });
  });
};

//
MyFile.read = function( fpath ) {
  return new Promise(( resolve, reject )=> {
    fs.readFile( fpath, ( err, data )=> {
      if ( err ) reject( err );
      else resolve( data );
    });
  });
};

//
MyFile.write = function( fpath, data ) {
  return new Promise(( resolve, reject )=> {
    fs.writeFile( fpath, data, ( err )=> {
      if ( err ) reject( err );
      else resolve();
    });
  });
};

// 指定ファイル(クエリによる指定)を別の指定場所にコピーする(ファイル名は同じになります)。
MyFile.copy = ( targetQuery, distDir )=> {
  return (
    Promise.resolve()
    .then( ()=> MyFile.findFiles( targetQuery ) )
    .then(( list )=> {
      let promises = list.map(( file )=> {
          let fileName = file.split('/').pop()
            , outputPath = path.join( distDir, '/'+fileName );
          return (
            Promise.resolve()
            .then( ()=> MyFile.read( file ) )
            .then( ( data )=> MyFile.write( outputPath, data ) )
          );
      });
      return Promise.all( promises );
    })
  );
};

//
MyFile.rename = function( oldPath, newPath ) {
  return new Promise(( resolve, reject )=> {
    fs.rename( oldPath, newPath, ( err )=> {
      if ( err ) reject( err );
      else resolve();
    });
  });
};

