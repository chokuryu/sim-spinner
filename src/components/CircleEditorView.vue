<template>
  <!--Unique Parameter For Circle-->
  <div class="siimple-grid">
    <div class="siimple-grid-row">
      <div class="siimple-grid-col siimple-grid-col--6 siimple-grid-col-md--12 siimple-grid-col-sm--12">

        <div class="row siimple-label" ref="name_frame">
          <label>Name:</label>
          <div><input type="text" class="siimple-input" v-model="name" value=""/></div>
        </div>
        <div class="row siimple-label" ref="type_frame">
          <label>Type:</label>
          <div><input type="text" class="siimple-input dis" v-model="type" value="" readonly/></div>
        </div>
        <div class="row siimple-label" ref="radius_frame">
          <label>Radius:</label>
          <div><input type="range" max="100" min="10" step="10" class="siimple-input" v-model.number="radius" value=""/>
              <span>{{ radius }}</span><span class="afterfield">px</span></div>
        </div>
        <div class="row siimple-label" ref="speed_frame">
          <label>Speed:</label>
          <div><input type="range" max="2" min="0.1" step="0.1" class="siimple-input" v-model.number="speed" value=""/>
              <span>{{ speed }}</span><span class="afterfield">s</span></div>
        </div>
        <div class="row siimple-label" ref="posY_frame">
          <label>Posision:</label>
          <div><input type="range" max="50" min="-50" step="10" class="siimple-input" v-model.number="posY" value=""/>
              <span>{{ posY }}</span><span class="afterfield"> px</span></div>
        </div>

      </div>
      <div class="siimple-grid-col siimple-grid-col--6 siimple-grid-col-md--12 siimple-grid-col-sm--12">

        <div class="row siimple-label" ref="colorR_frame">
          <label>color R:</label>
          <div><input type="range" max="255" min="0" step="1" class="siimple-input" v-model.number="colorR" value=""/>
              <span>({{ colorR }})</span></div>
        </div>
        <div class="row siimple-label" ref="colorG_frame">
          <label>color G:</label>
          <div><input type="range" max="255" min="0" step="1" class="siimple-input" v-model.number="colorG" value=""/>
              <span>({{ colorG }})</span></div>
        </div>
        <div class="row siimple-label" ref="colorB_frame">
          <label>color B:</label>
          <div><input type="range" max="255" min="0" step="1" class="siimple-input" v-model.number="colorB" value=""/>
              <span>({{ colorB }})</span></div>
        </div>
        <div class="row siimple-label" ref="thin_frame">
          <label>Thin:</label>
          <div><input type="range" max="10" min="1" step="1" class="siimple-input" v-model.number="thin" value=""/>
              <span>({{ thin }})</span><span class="afterfield">px</span></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Store from '@/scripts/Store'
import FactorDefinition from '@/scripts/FactorDefinition'
const FACTOR_TYPE = 'CIRCLE'

export default {
  name: 'CircleEditorView',
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
