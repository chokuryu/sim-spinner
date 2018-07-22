//
// Accessor.js
//

// This is localstorage accessor.

export default class Accessor {

  constructor () {
    this.canUseLS = false
    this.sto = null
  }

  checkAccessibility () {
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
  }

  checkExistData () {
    if (!this.canUseLS) throw Error('Can not check cause LS is disable.')
    // 既存データなし
    if (typeof this.sto.data !== 'string') return false
    // 既存データあり
    try {
      // 既存データはJSON
      let _data = JSON.parse(this.sto.data)
      if (_data && typeof _data === 'object') return true
      else return false
    } catch(err) {
      return false
    }
  }

  load () {
    if (!this.canUseLS) return null
    return JSON.parse(this.sto.data)
  }

  save (data) {
    if (!this.canUseLS) return false
    this.sto.data = JSON.stringify(data)
    return true
  }

  clearAll() {
    if (!this.canUseLS) return false
    this.sto.data = null
    return true
  }


}
