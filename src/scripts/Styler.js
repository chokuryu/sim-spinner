/**
*
* js
*
*/

import FactorDefinition from '@/scripts/FactorDefinition'

export default {

  applyStyle(el, factor, isStatic = false) {
    FactorDefinition.applyStyle(factor.type, el, factor)
    if (isStatic) {
      el.style['animation'] = 'none'
    }
  },

  addConstCssToBodyOnce() {
    if (this._isStylePasted) return
    let styleText = FactorDefinition.readConstCssText()
    let el = document.createElement('style')
    el.innerHTML = styleText
    document.querySelector('body').appendChild(el)
    this._isStylePasted = true
  },

  _isStylePasted: false


}

