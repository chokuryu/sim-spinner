<template>
<div class="factor-frame" ref="el_frame">
  <div
    v-for="(factor) in factors" :key="factor.id"
    :data-fid="factor.id"
    :class="[
      classByType(factor),
      { opq : shouldOpq(factor.id) }
    ]"
  ></div>
</div>
</template>

<script>
import Store from '@/scripts/Store'
import Styler from '@/scripts/Styler'

export default {
  name: 'VisionView',
  props: ['wid', 'fid-list', 'no-animation', 'emphasize-to'],
  data () {
    return {
      factors: []
    }
  },
  computed: {

  },
  mounted() {
    Styler.addConstCssToBodyOnce()
    this.start()
  },
  destroyed() {
    this.reset()
  },
  watch: {
    fidList: function() {
      this.reset()
      this.start()
    },
    // emphasizeTo() {

    // }
  },
  methods: {
    classByType (factor) {
      return (
        factor.type === 'CIRCLE' ? 'factor-item-circle' :
        factor.type === 'TEXT' ? 'factor-item-text' :
        factor.type === 'RECT' ? 'factor-item-rect' :
        ''
      );
    },
    //
    start() {
      let dict = Store.referFactorDictOf(this.wid)

      // this.factors を設置
      this.factors = this.fidList.map( (fid)=>{
        return {
          id: fid,
          type: dict[fid].type
        };
      })

      // CSSを適用
      this.fidList.forEach((fid)=>{
        //
        this.$nextTick(function() {
          this.render(fid)
        })
        //
        Store.subscribeFactorUpdate(fid, ()=>{
          this.render(fid)
        });
      })
    },
    reset() {
      Store.unsubscribeFactorsUpdate()
    },
    //
    render(fid) {
      let factor = Store.referFactor(fid)
      let el = document.querySelector(`div[data-fid="${fid}"]`)
      if (this.noAnimation === undefined) {
        Styler.applyStyle(el, factor, false)
      } else {
        Styler.applyStyle(el, factor, true)
      }
    },
    shouldOpq(id) {
      return (typeof this.emphasizeTo === 'string' && this.emphasizeTo !== id);
    }
  }
}





</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagelayout-dark .opq.factor-item-circle {
  border-color: rgba(70,70,70,0.2) !important;
  z-index: 100;
}
.pagelayout-dark .opq.factor-item-text {
  color: rgba(70,70,70,0.2) !important;
  z-index: 100;
}
.pagelayout-dark .opq.factor-item-rect {
  background-color: rgba(70,70,70,0.2) !important;
  z-index: 100;
}

.opq.factor-item-circle {
  border-color: rgba(215,215,215,0.2) !important;
  z-index: 100;
}
.opq.factor-item-text {
  color: rgba(215,215,215,0.2) !important;
  z-index: 100;
}
.opq.factor-item-rect {
  background-color: rgba(215,215,215,0.2) !important;
  z-index: 100;
}

/*
.factor-frame {
  position: relative;
  width: 100%; height: 100%;
}

.factor-item-circle {
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


.factor-item-text {
  z-index: 103;
  top: 50%; left: 50%;
  width: 1px; height: 1px;
  position: absolute;
}

.factor-item-rect {
  z-index: 101;
  top: 50%; left: 50%;
  position: absolute;
}
*/

</style>
