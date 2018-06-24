/**
*
* js
*
*/

let FactorDefinition = {

  _settings: {},
  add(option) {
    let obj = option
    this._settings[option.typeName] = Object.assign(obj, makings);
  },


  getEditorObserbedParameter(type) {
    return this._settings[type].editorObservedParameter
  },
  getDefaultByType(type) {
    return Object.assign({}, this._settings[type].default)
  },
  applyStyle(type, el, factor) {
    this._settings[type].applyStyle(el, factor)
  },
  createCssTextByType(factor, className) {
    return this._settings[factor.type].createCssText(factor, className)
  },
  createOutputClassName(factor) {
    return `spinner-${factor.type}-${factor.id}`
  },
  //
  getTypeNames() {
    return Object.keys(this._settings).sort()
  },
  getDefaultNameHash() {
    let types = Object.keys(this._settings).sort()
    let hash = {}
    types.forEach(type => {
      hash[type] = this._settings[type].default.name
    });
    return hash;
  },
  readConstCssText() {
    return CONST_CSS
  },
  getFixedClassNames() {
    let hash = Object.assign({
      frame: FIXED_CLS_NAME_OF_FRAME
    }, COMMON_CLS_NAMES)
    return hash
  }
}

export default FactorDefinition;

const TYPENAME_CIRCLE = 'CIRCLE'
const TYPENAME_TEXT = 'TEXT'
const TYPENAME_RECT = 'RECT'

const makings = {

  //
  applyStyle(el, factor) {
    let vals = this.calcValueSet(factor)
    this.outputPropertyNames.forEach(propName => {
      el.style[propName] = vals[propName]
    })
    if (factor.text) {
      el.innerHTML = factor.text
    }
  },

  //
  createCssText(factor, className) {
    let text = ''
    let vals = this.calcValueSet(factor)
    this.outputPropertyNames.forEach(propName => {
      text += `  ${ propName }: ${ vals[propName] };`
      text += '\n'
    })
    return `.${className} {\n${text}}`;
  }
};


/* -------------- */


// CIRCLE
FactorDefinition.add({

  typeName: TYPENAME_CIRCLE,

  editorObservedParameter: [ 'name', 'type', 'radius', 'speed', 'posY', 'colorR', 'colorG', 'colorB', 'thin' ],

  default: {
    name: 'circle',
    type: TYPENAME_CIRCLE,
    radius: 50,
    speed: 0.6,
    posY: 0,
    colorR: 200,
    colorG: 200,
    colorB: 200,
    thin: 2
  },

  outputPropertyNames: [
    'width', 'height', 'margin',
    'border-radius', 'border-width', 'border-color', 'border-right-color',
    'animation-duration'
  ],

  calcValueSet(factor) {
    let position = 0 - (Number(factor.radius) - Number(factor.posY) )
    return {
      'width':              factor.radius * 2 + 'px',
      'height':             factor.radius * 2 + 'px',
      'margin':             `${position}px 0 0 -${factor.radius}px`,
      'border-radius':      `${factor.radius}px`,
      'border-width':       factor.thin + 'px',
      'border-color':       `rgb(${factor.colorR}, ${factor.colorG}, ${factor.colorB} )`,
      'border-right-color': 'transparent',
      //el.style.animation = 'spin 0.6s linear infinite'
      'animation-duration': factor.speed + 's'
    }
  }
})

// TEXT
FactorDefinition.add({

  typeName: TYPENAME_TEXT,

  editorObservedParameter: [ 'name', 'type', 'posY', 'colorR', 'colorG', 'colorB', 'text' ],

  default: {
    name: 'text',
    type: TYPENAME_TEXT,
    posY: 0,
    colorR: 200,
    colorG: 200,
    colorB: 200,
    text: 'Loading'
  },

  outputPropertyNames: [
    'width', 'margin',
    'color'
  ],

  calcValueSet(factor) {
    //let height = 20
    let position = Number(factor.posY)
    return {
      'margin': `${position}px 0 0 -50%`,
      'width':  '100%',
      'color':  `rgb(${factor.colorR}, ${factor.colorG}, ${factor.colorB} )`
    };
  }

})

// RECT
FactorDefinition.add({

  typeName: TYPENAME_RECT,

  editorObservedParameter: [ 'name', 'type', 'size', 'radius', 'colorR', 'colorG', 'colorB', 'colorA' ],

  default: {
    name: 'rect',
    type: TYPENAME_RECT,
    colorR: 200,
    colorG: 200,
    colorB: 200,
    colorA: 0.5,
    size: 80,
    radius: 10
  },

  outputPropertyNames: [
    'width', 'height', 'margin',
    'border-radius', 'background-color'
  ],

  calcValueSet(factor) {
    let half = factor.size / 2
    return {
      'margin':           `-${half}px 0 0 -${half}px`,
      'height':           `${factor.size}px`,
      'width':            `${factor.size}px`,
      'border-radius':    `${factor.radius}px`,
      'background-color': `rgba(${factor.colorR}, ${factor.colorG}, ${factor.colorB}, ${factor.colorA} )`
    };
  }

})


/* -------------- */


//
const COMMON_CLS_NAMES = {}
COMMON_CLS_NAMES[TYPENAME_CIRCLE] = 'factor-item-circle'
COMMON_CLS_NAMES[TYPENAME_TEXT] = 'factor-item-text'
COMMON_CLS_NAMES[TYPENAME_RECT] = 'factor-item-rect'
const FIXED_CLS_NAME_OF_FRAME = 'factor-frame'

//
const CONST_CSS =
`.${FIXED_CLS_NAME_OF_FRAME} {
  position: relative;
  width: 100%; height: 100%;

  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: normal;
}
.${FIXED_CLS_NAME_OF_FRAME} div{
  box-sizing: border-box;
}

.${COMMON_CLS_NAMES[TYPENAME_CIRCLE]} {
  z-index: 102;
  border: 2px solid #4ba4e6;
  top: 50%; left: 50%;
  position: absolute;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  0%   { transform: rotate(0deg);   opacity: 0.2; }
  50%  { transform: rotate(180deg); opacity: 1.0; }
  100% { transform: rotate(360deg); opacity: 0.2; }
}

.${COMMON_CLS_NAMES[TYPENAME_TEXT]} {
  z-index: 103;
  top: 50%; left: 50%;
  width: 1px; height: 1px;
  position: absolute;
  text-align: center;
}

.${COMMON_CLS_NAMES[TYPENAME_RECT]} {
  z-index: 101;
  top: 50%; left: 50%;
  position: absolute;
}`;






