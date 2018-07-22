
//

export const DATA_VERSION = '0.1.2';


export function createDefaultData() {
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


export function createDefaultWork(  ) {
  return {
    name: 'New Spinner',
    isDark: false,
    ownFactors: []
  }
}

