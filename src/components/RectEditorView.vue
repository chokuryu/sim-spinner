<template>
  <div>
    <!--Unique Parameter For Rect-->
    <div class="row siimple-label">
      <label>Name:</label>
      <div><input type="text" class="siimple-input" v-model="name" value=""/></div>
    </div>
    <div class="row siimple-label">
      <label>Type:</label>
      <div><input type="text" class="siimple-input dis" v-model="type" value="" readonly/></div>
    </div>
    <div class="row siimple-label">
      <label>Size:</label>
      <div><input type="range" max="200" min="0" step="10" class="siimple-input" v-model.number="size" value=""/>
          <span>({{ size }})</span><span class="afterfield">px</span></div>
    </div>
    <div class="row siimple-label">
      <label>Radius:</label>
      <div><input type="range" max="100" min="0" step="5" class="siimple-input" v-model.number="radius" value=""/>
          <span>({{ radius }})</span><span class="afterfield">px</span></div>
    </div>
    <div class="row siimple-label">
      <label>color R:</label>
      <div><input type="range" max="255" min="0" step="1" class="siimple-input" v-model.number="colorR" value=""/>
          <span>({{ colorR }})</span></div>
    </div>
    <div class="row siimple-label">
      <label>color G:</label>
      <div><input type="range" max="255" min="0" step="1" class="siimple-input" v-model.number="colorG" value=""/>
          <span>({{ colorG }})</span></div>
    </div>
    <div class="row siimple-label">
      <label>color B:</label>
      <div><input type="range" max="255" min="0" step="1" class="siimple-input" v-model.number="colorB" value=""/>
          <span>({{ colorB }})</span></div>
    </div>
    <div class="row siimple-label">
      <label>color A:</label>
      <div><input type="range" max="1" min="0" step="0.1" class="siimple-input" v-model.number="colorA" value=""/>
          <span>({{ colorA }})</span></div>
    </div>

  </div>
</template>

<script>
import Store from '@/scripts/Store'
import FactorDefinition from '@/scripts/FactorDefinition'
const FACTOR_TYPE = 'RECT'

export default {
  name: 'RectEditorView',
  components: {

  },
  props: ['fid'],
  data () {
    return Store.referFactor(this.fid)
  },

  computed: {

  },
  watch: (()=>{
    let PROPS = FactorDefinition.getEditorObserbedParameter(FACTOR_TYPE)
    let watchMethods = Store.createParameterWatcheMethods(PROPS)
    return watchMethods
  })(),
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
