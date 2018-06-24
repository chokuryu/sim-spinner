/**
*
* js
*
*/
import FactorDefinition from '@/scripts/FactorDefinition'

export default {
  createNewFactor(type, name) {
    let factor = FactorDefinition.getDefaultByType(type)
    factor.name = name
    return factor
  }
}
