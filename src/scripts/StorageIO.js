/**
*
* js
*
*/

let Accessor = (()=>{

  return {
    canUseLS: false,
    sto: null,
    checkAccessibility() {
      try {
        let sto = window.localStorage
        let key = 'k'
        sto.setItem(key, 'val')
        sto.removeItem(key)
        this.sto = sto
        console.log('LS Usable!!')
        return true
      } catch(err) {
        return false
      }
    },
    checkExistData() {
      if (!this.canUseLS) throw Error('Can not check cause LS is disable.')
      // 既存データあり
      if (typeof this.sto.data !== 'string') return false
      try {
        // 既存データはJSON
        let _data = JSON.parse(this.sto.data)
        if (_data && typeof _data === 'object') return true
        else return false
      } catch(err) {
        return false
      }
    },
    load() {
      if (!this.canUseLS) return null
      return JSON.parse(this.sto.data)
    },
    save(data) {
      if (!this.canUseLS) return null
      this.sto.data = JSON.stringify(data)
      //console.dir(this.sto.data)
    }
    //,
    // reset() {
    //   if (!this.canUseLS) return null
    //   this.sto.data = null
    // }
  };

})();



const DATA_VERSION = '0.1.2';

export default class StorageIO {

  constructor() {
    // VMから直接参照されうるデータオブジェクト
    this.data = null
    //
    this.lazyExecutor = createLazyExecutor(300)
    //
    this.transactError = function(err) {
      alert('[StorageIO Error]\n' + err.message)
    }
  }

  setupFromLocalStorageAsync() {
    return new Promise((resolve, reject) => {
      // 既存データをストレージから読み込み
      setTimeout( ()=>{
        // 既存データ
        if (Accessor.checkAccessibility()) {
          // アクセス成功
          Accessor.canUseLS = true

          if (Accessor.checkExistData()) {
            // データがある
            console.log('LS Data Existing...')
            this.data = Accessor.load()
            // バージョンが変わっていればデータリセット
            if (this.data.version !== DATA_VERSION) this.resetData()

          } else {
            // データがない = 初期化
            console.log('LS Initialization...')
            this.resetData()


          }

        } else {
          // アクセス失敗
          Accessor.canUseLS = false
          this.data = createDefaultData()

        }

        resolve();
      }, 500 );
    });
  }

  checkCanUseLS() {
    return Accessor.canUseLS
  }

  resetData() {
    this.data = createDefaultData()
    Accessor.save(this.data)
  }

  /* ---- */

  saveAll() {
    //
    Accessor.save(this.data)
  }

  saveLazy() {
    this.lazyExecutor.set(()=>{
      Accessor.save(this.data)
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
      Accessor.save(this.data)
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
      Accessor.save(this.data)
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
      Accessor.save(this.data)
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
      Accessor.save(this.data)
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

/* ---- */

function createDefaultData() {
  return {
    version: DATA_VERSION,
    workIndex: 1,
    factorIndex: 4,
    works: {
      'w_1': {
        name: 'Sample Spinner',
        isDark: false,
        ownFactors: [ 'f_1', 'f_2', 'f_3', 'f_4' ]
      }
    },
    factors: {
      'f_1': {
        id: 'f_1',
        name: 'circle1',
        type: 'CIRCLE',
        radius: 60,
        speed: 0.6,
        posY: 0,
        colorR: 75,
        colorG: 164,
        colorB: 230,
        thin: 2
      },
      'f_2': {
        id: 'f_2',
        name: 'circle2',
        type: 'CIRCLE',
        radius: 30,
        speed: 0.6,
        posY: 0,
        colorR: 75,
        colorG: 164,
        colorB: 230,
        thin: 2
      },
      'f_3': {
        id: 'f_3',
        name: 'text1',
        type: 'TEXT',
        posY: 0,
        colorR: 75,
        colorG: 164,
        colorB: 230,
        text: 'Loading'
      },
      'f_4': {
        id: 'f_4',
        name: 'rect1',
        type: 'RECT',
        colorR: 75,
        colorG: 164,
        colorB: 230,
        colorA: 0.5,
        size: 80,
        radius: 10
      }
    }
  };
}

function createDefaultWork(  ) {
  return {
    name: 'New Spinner',
    isDark: false,
    ownFactors: []
  }
}

