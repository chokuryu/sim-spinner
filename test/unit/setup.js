import Vue from 'vue'

Vue.config.productionTip = false


//import Store from '@/scripts/Store'
//Store.destroy()
//Store.initializeForTest()



// メモ
//
// Jestのテストはテストファイルごとに別のコンテクスト(nodeプロセス？)で実行される。
// なので、各テストファイルの先頭でStore.aをconsoleで出力すると全部0になる。
//
//
// if (typeof Store.a === 'number') {
//   Store.a += 1
// } else {
//   Store.a = 0
// }
