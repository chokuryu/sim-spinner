'use strict';
const path = require('path')
const fs = require('fs-extra')

// 設定
const EXT_LIB_SETTINGS = {
  into: path.resolve(__dirname, '../src/externalLib'),
  targets: [
    path.resolve(__dirname, '../node_modules/@fortawesome/fontawesome-free'),
    path.resolve(__dirname, '../node_modules/siimple/dist/siimple.min.css')
  ]
}

//
// 事前処理
//
module.exports = async function beforeCompile () {

  console.log('start beforeCompile')

  const result = {
    hasError: false
  }

  try {
    await sub.copyLib(EXT_LIB_SETTINGS)
  } catch (err) {
    console.log('!!!! error at beforeCompile')
    console.error(err)
    result.hasError = true
  }

  console.log('end beforeCompile')

  return result
}


/* ----- */


//
const sub = {}

//
sub.copyLib = function (option = {}) {

  const PRF = '[copyLib]'

  async function copyThem (intoDir, targets) {
    for (let i=0; i<targets.length; i+=1) {

      // exlibにすでに存在していればコピーしない
      let isExist
      //
      const name = targets[i].split('/').pop()
      if (!name) throw Error(`${PRF} target指定が間違っています: ${targets[i]}`)
      try {
        // チェック
        const stats = fs.statSync(path.join(intoDir, '/' ,name))
        if (stats.isDirectory() || stats.isFile()) {
          isExist = true
          console.log(`${PRF} コピーを省略: ${targets[i]}`)
        }
      } catch (err) { // 注: エラーではない
        isExist = false
      }

      if (isExist) continue

      //まだ存在してないのでコピーを実行する
      if (isTargetDir(targets[i])) {
        // Dirの場合
        const newDir = intoDir + '/' + name
        await fs.ensureDir(newDir)
        await fs.copy(targets[i], newDir)//再帰コピー
      } else {
        // Fileの場合
        const newFile = intoDir + '/' + name
        await fs.copy(targets[i], newFile)
      }
      console.log(`${PRF} コピーしました: ${targets[i]}`)

    }
  }

  function isTargetDir (target) {
    const stats = fs.statSync(target)
    return stats.isDirectory()
  }

  //
  return Promise.resolve()
    .then(() => {
      if (!option.into) throw Error(`${PRF} into指定がありません`)
      const intoDir = option.into
      const targets = option.targets || []

      try {
        var stats = fs.statSync(intoDir)
      } catch (err) {
        throw Error(`${PRF} コピー先dirが存在しない: ${intoDir}` + `\n  このプロジェクトには上記の空ディレクトリが必須です`)
      }
      if (!stats.isDirectory()) throw Error(`${PRF} コピー先がdirでない: ${intoDir}`)
      return { intoDir, targets }
    })
    .then((arg) => {
      // It returns promise
      return copyThem(arg.intoDir, arg.targets)
    })
  ;
}
