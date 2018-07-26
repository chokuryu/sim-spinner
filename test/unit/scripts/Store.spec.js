import sinon from 'sinon'

import Store from '@/scripts/Store'
import { createDefaultData, createDefaultWork } from '@/scripts/SampleMaker'


// MEMO: Store is static facade.


// Jestテスト実行順序の仕様メモ
//
// テストファイルに書かれた処理の実行順序はネストの浅い側のdescribeが先に実行され、
// １段深いネストのdescribeは浅いdescribeが全て実行された後に実行される。
// そのため、グローバルオブジェクトの初期化はそれぞれit関数の内側でやらないといけない。
// すべてのdescribeが実行された後にitが実行されるからだ。
// describeの内側のitの外側で初期化を書いてもitの前に別のdescribeが走ってしまう。
//
//console.log(Store.a)

//

describe('initialization for test', () => {
  //Store.a += 100; console.log(Store.a);

  it('is able to initialize for test.',() => {
    //Store.a += 1; console.log(Store.a);
    Store.destroy()
    expect(Store.isInitialized).toBe(false)
    Store.initializeForTest()
    expect(Store.isInitialized).toBe(true)

    expect(Store.canUseLocalStorage()).toBe(false)
  })

  it('destroyes all state.',() => {
    //Store.a += 1; console.log(Store.a);
    Store.destroy()
    Store.initializeForTest()

    Store.subscribeFactorUpdate('some_factor_id', () => {})

    expect(Store.isInitialized).toBe(true)
    expect(Object.keys(Store.listeners).length).not.toBe(0)

    Store.destroy()

    expect(Store.isInitialized).toBe(false)
    expect(Object.keys(Store.listeners).length).toBe(0)
  })

  test('to refere data before initialize', () => {
    //Store.a += 1; console.log(Store.a);
    Store.destroy()
    expect(Store.referWorkDict).toThrow()
  })

})


describe('with inithialization for test', () => {

  //Store.a += 100; console.log(Store.a);

  // !! Important
  beforeEach(() => {
    Store.destroy()
    Store.initializeForTest()
  })


  describe('To subscribe and publish', () => {
    //Store.a += 10; console.log(Store.a);

    it('is able to subscribe update factor by fid',() => {
      //Store.a += 1; console.log(Store.a);

      const spy = sinon.stub()
      const fid = 'some_factor_id'

      Store.subscribeFactorUpdate(fid, () => spy())
      expect(Object.keys(Store.listeners).length).toBe(1)

      Store.publishFactorUpdate(fid)
      expect(spy.calledOnce).toBeTruthy()

      Store.unsubscribeFactorsUpdate()
      expect(Object.keys(Store.listeners).length).toBe(0)
    })

  })


  describe('Around work data',() => {
    //Store.a += 10; console.log(Store.a);

    const def = createDefaultData()
    const wid = Object.keys(def.works)[0]

    it('has default data includes work.',() => {
      //Store.a += 1; console.log(Store.a);

      expect(Store.referWorkDict()).toEqual(def.works)
      expect(Store.referWork(wid)).toEqual(def.works[wid])
    })

    it('adds, deletes', () => {
      //Store.a += 1; console.log(Store.a);

      Store.addWork()
      const len1 = Object.keys(Store.referWorkDict()).length
      expect(len1).toBe(2)

      Store.deleteWork(wid)
      const len2 = Object.keys(Store.referWorkDict()).length
      expect(len2).toBe(1)
    })

    it('saves (no mean if initialized by test)', () => {

      expect(Store.canUseLocalStorage()).toBe(false)
      Store.saveWork()
    })

  })


  describe('Around factor data',() => {
    //Store.a += 10; console.log(Store.a);

    const def = createDefaultData()
    const wid = Object.keys(def.works)[0]

    it('has default data includes factor.', () => {
      expect(Store.referFactorDictOf(wid)).toEqual(def.factors)
      expect(Store.getFactorIdListOf(wid)).toEqual(def.works[wid].ownFactors)

      const fid = def.works[wid].ownFactors[0]
      expect(Store.referFactor(fid)).toEqual(def.factors[fid])
    })

    it('adds, deletes', () => {
      let len = Store.getFactorIdListOf(wid).length
      const dummyFactor = {}
      Store.addFactor(wid, dummyFactor)
      expect(Store.getFactorIdListOf(wid).length).toBe(len + 1)

      const fid = Store.getFactorIdListOf(wid)[0]
      Store.deleteFactor(wid, fid)
      expect(Store.getFactorIdListOf(wid).length).toEqual(len)
    })

  })


})


describe('To create parameter watch methods for vue component',() => {

  it('creates function mapped object', () => {
    const keys = ['a', 'b']
    const methods = Store.createParameterWatcheMethods(keys)
    expect(Object.keys(methods)).toEqual(keys)
    expect(keys.filter(key => typeof methods[key] === 'function').length).toBe(keys.length)
  })

})


describe('Store - with localstorage', () => {

  it('initializes with checking accessiblity to localstorage.',(done) => {

    Store.destroy()

    Promise.resolve()
    // (1) - LS:disable
    .then(() => Store.initializeAsync())
    .then(() => {
      expect(Store.isInitialized).toBe(true)
      expect(Store.canUseLocalStorage()).toBe(false)

      // Make localstorage valid!
      require('jest-localstorage-mock')
      expect(localStorage.data).toBeUndefined()

      Store.destroy()
    })
    // (2) - LS:able (check no data in LS)
    .then(() => Store.initializeAsync())
    .then(() => {
      expect(Store.isInitialized).toBe(true)
      expect(Store.canUseLocalStorage()).toBe(true)

      // A default work data has been saved in LS
      const data = JSON.parse(localStorage.data)
      expect(Object.keys(data.works).length).toBe(1)
      // Data will be added and saved...
      Store.addWork()

      Store.destroy()
    })
    // (3) - LS:able (and check remaining data in LS)
    .then(() => Store.initializeAsync())
    .then(() => {
      expect(Store.isInitialized).toBe(true)
      expect(Store.canUseLocalStorage()).toBe(true)

      // Data added has been remained
      expect(Object.keys(Store.referWorkDict()).length).toBe(2)

      // FIN
      localStorage.setItem.mockClear()
      done()
    })
    //
    .catch(err => {
      console.log('It is unexpected on test.')
      throw err
      // expect(Store.isInitialized).toBe(false)
      // // FIN
      // localStorage.setItem.mockClear()
      // done()
    })

  })




})





