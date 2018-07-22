/**
*
* js
*
*/
import Accessor from './Accessor'
import { DATA_VERSION, createDefaultData, createDefaultWork } from '@/scripts/SampleMaker'


export default class StorageIO {

  constructor() {
    //
    this.accessor = new Accessor()
    // VMから直接参照されうるデータオブジェクト
    this.data = null
    //
    this.lazyExecutor = createLazyExecutor(300)
    //
    this.transactError = function(err) {
      console.error(err)
      alert('[StorageIO Error]\n' + err.message)
    }
  }

  setupForTest () {
    this.accessor.canUseLS = false
    this.data = createDefaultData()
  }

  setupFromLocalStorageAsync() {
    return new Promise((resolve, reject) => {
      // 既存データをストレージから読み込み
      setTimeout( ()=>{
        // 既存データ
        if (this.accessor.checkAccessibility()) {
          // アクセス成功
          this.accessor.canUseLS = true

          if (this.accessor.checkExistData()) {
            // データがある
            console.log('LS Data Existing...')
            this.data = this.accessor.load()
            // バージョンが変わっていればデータリセット
            if (this.data.version !== DATA_VERSION) this.resetData()

          } else {
            // データがない = 初期化
            console.log('LS Initialization...')
            this.resetData()

          }

        } else {
          // アクセス失敗
          this.accessor.canUseLS = false
          this.data = createDefaultData()

        }

        resolve();
      }, 500 );
    });
  }

  checkCanUseLS() {
    return this.accessor.canUseLS
  }

  resetData() {
    this.data = createDefaultData()
    this.accessor.save(this.data)
  }

  /* ---- */

  saveAll() {
    //
    this.accessor.save(this.data)
  }

  saveLazy() {
    this.lazyExecutor.set(()=>{
      this.accessor.save(this.data)
    })
  }

  /* ---- */

  getWorkDict() {
    try {
      return this.data.works
    } catch(err) {
      this.transactError(err)
    }
  }

  getWork(wid) {
    try {
      return this.data.works[wid] || null
    } catch(err) {
      this.transactError(err)
    }
  }

  addWork() {
    try {
      let dt = this.data
      let work = createDefaultWork()
      dt.workIndex += 1
      let wid = 'w_' + dt.workIndex
      this.data.works[wid] = work
      //
      this.accessor.save(this.data)
    } catch(err) {
      this.transactError(err)
    }
  }

  deleteWork(wid) {
    try {
      let dt = this.data
      // Delete factors
      dt.works[wid].ownFactors = dt.works[wid].ownFactors.forEach((fid)=>{
        delete dt.factors[fid]
      });
      // Delete work
      delete dt.works[wid]
      //
      this.accessor.save(this.data)
    } catch(err) {
      this.transactError(err)
    }
  }

  getFactorsOf(wid) {
    try {
      let work = this.data.works[wid]
      let factors = {}
      work.ownFactors.forEach( (fid)=>{
        factors[fid] = this.data.factors[fid];
      });
      return factors
    } catch(err) {
      this.transactError(err)
    }
  }

  getFactor(fid) {
    try {
      return this.data.factors[fid] || null
    } catch(err) {
      this.transactError(err)
    }
  }

  addFactor(wid, factor) {
    try {
      let dt = this.data
      dt.factorIndex += 1
      let fid = 'f_' + dt.factorIndex
      factor.id = fid
      dt.works[wid].ownFactors.push(fid)
      dt.factors[fid] = factor
      //
      this.accessor.save(this.data)
    } catch(err) {
      this.transactError(err)
    }
  }

  deleteFactor(wid, fid) {
    try {
      let dt = this.data
      dt.works[wid].ownFactors = dt.works[wid].ownFactors.filter((id)=>{
        return (id !== fid)
      });
      delete dt.factors[fid]
      //
      this.accessor.save(this.data)
    } catch(err) {
      this.transactError(err)
    }
  }

}

/* ---- */

/*
* 予約処理実行オブジェクトを返す
* - wait経過後に実行 wait経過前にsetすると以前の予約処理は取り消される
*/
function createLazyExecutor(wait) {
  let timerId = null;
  let cache = null;
  let exec = function() {
    //console.log('saved by lazy executor.')
    cache()
    cache = null
  };
  return {
    set(f) {
      if (timerId) window.clearTimeout(timerId)
      cache = f
      timerId = window.setTimeout(exec, wait)
    }
  };
}



