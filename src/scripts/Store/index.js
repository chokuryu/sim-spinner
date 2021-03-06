/**
*
* Store.js
*
*/
import StorageIO from './StorageIO'

export default (function(){

  var storageIO = null;

  return {
    //
    isInitialized: false,
    //
    initializeAsync () {

      storageIO = new StorageIO()

      return new Promise((resolve, reject) => {
        Promise.resolve().
        then(res => storageIO.setupFromLocalStorageAsync()).
        then(res => {
          this.isInitialized = true
          resolve()
        }).
        catch((err) => {
          alert('Failed to initializeAsync on StorageIO.')
          console.error(err.message)
          reject(err)
        });
      });
    },
    //
    initializeForTest () {

      storageIO = new StorageIO()

      storageIO.setupForTest()
      this.isInitialized = true
    },
    //
    canUseLocalStorage() {
      return storageIO.checkCanUseLS();
    },
    //
    destroy () {
      storageIO = null;
      for (let key in this.listeners) {
        delete this.listeners[key]
      }
      this.isInitialized = false
    },

    //
    saveWork(wid) {
      storageIO.saveAll()
    },

    //
    referWorkDict() {
      return storageIO.getWorkDict()
    },
    // returns Work or null
    referWork(wid) {
      return storageIO.getWork(wid)
    },
    addWork() {
      storageIO.addWork()
    },
    deleteWork(wid) {
      storageIO.deleteWork(wid)
    },
    referFactorDictOf(wid) {
      return storageIO.getFactorsOf(wid)
    },
    getFactorIdListOf(wid) {
      return Object.keys( storageIO.getFactorsOf(wid) )
    },
    // returns Factor or null
    referFactor(fid) {
      return storageIO.getFactor(fid)
    },
    addFactor(wid, factor) {
      storageIO.addFactor(wid, factor)
    },
    deleteFactor(wid, fid) {
      storageIO.deleteFactor(wid, fid)
    },

    //
    listeners: {
      //'circle001': function() {}
    },
    createParameterWatcheMethods(props) {
      let that = this;
      let watchMethods = {}
      props.forEach(key => {
        watchMethods[key] = function() {
          let fid = this.fid
          that.publishFactorUpdate(fid)
        };
      });
      return watchMethods
    },
    subscribeFactorUpdate(fid, listener) {
      this.listeners[fid] = listener
    },
    publishFactorUpdate(fid) {
      storageIO.saveLazy()
      if (typeof this.listeners[fid] !== 'function') return
      this.listeners[fid]()
    },
    unsubscribeFactorsUpdate() {
      this.listeners = []
    }
  }

})();



