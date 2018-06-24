<template>
  <div class="" :class="{ 'pagelayout-dark' : work.isDark }">

    <!-- Work Preview Row -->
    <div class="miniPreview-row bg-pattern-check">

      <!-- Navi -->
      <div class="pagelayout-navi">
        <div class="naviframe">
          <div class="naviframe-left">
            <a class="siimple-btn siimple-btn--navy my-roundBtn"
              @click="showWorkConfigureModal"
            >
              <i class="fas fa-cog"></i>
            </a>
            <span class="my-title">&nbsp;{{ work.name }}</span>
          </div>
          <div class="naviframe-right">
            <span @click="back" class="projectLabel siimple-btn siimple-btn--navy">
              <i class="fa fa-home xfa-th-large"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Vision -->
      <div class="miniPreview-box">
        <div class="vision-outer" style="margin-top: 40px">
          <vision-view
            v-bind:wid="wid"
            :fid-list="displayFactorIdList"
            :emphasize-to="emphasizedFid"
          />
        </div>
      </div>

      <!-- Preview Button -->
      <div class="previewBtn">
        <a class="siimple-btn clearBtn" v-on:click="seguePreview"><i class="fas fa-expand-arrows-alt"></i></a>
      </div>
    </div>

    <div class="fixedBox"></div>

    <!-- Work Editorial -->
    <div class="subRouteSpacer"></div>
    <div class="subRouteWrapper">
      <transition name="drill" mode="out-in" appear>
      <router-view
        :updation-index="subRouteUpdationIndex"
        @requestAddFactor="showFactorAddModal"
        @emphasizeFactor="emphasizeFactor"
        class="routerV"
      />
      </transition>
    </div>

    <modal-content-work-configure :shown="workConfModalShown" :wid="wid"
    @done="listenerDoneWorkConf"
    @doneDeleteWork="back"/>

    <modal-content-additional-factor :shown="factorAddModalShown" :wid="wid"
    @done="listenerDoneFactorAdd"/>

  </div>
</template>


<script>
import Store from '@/scripts/Store'
import VisionView from '@/components/VisionView.vue'
import ModalContentWorkConfigure from '@/components/ModalContentWorkConfigure.vue'
import ModalContentAdditionalFactor from '@/components/ModalContentAdditionalFactor.vue'

export default {
  name: 'WorkPage',
  components: {
    VisionView,
    ModalContentWorkConfigure,
    ModalContentAdditionalFactor
  },
  props: ['wid'],
  data () {
    let work = Store.referWork(this.wid)
    return {
      subRouteUpdationIndex: 1,
      displayFactorIdList: [],
      work,
      emphasizedFid: null,
      workConfModalShown: false,
      factorAddModalShown: false
    }
  },
  created() {

  },
  mounted() {
    //
    this.refleshFactors()
  },
  computed: {

  },
  methods: {

    refleshFactors() {
      this.displayFactorIdList = Store.getFactorIdListOf(this.wid)
      this.subRouteUpdationIndex += 1
    },

    seguePreview() {
      //this.$router.push({ path: `/work/${this.wid}/preview` })
      this.$router.replace({ name: '@=preview', params: { wid: this.wid } })
    },
    back() {
      //this.$router.push('/home')
      this.$router.push({ name: '@=home' })
    },

    showFactorAddModal() {
      this.factorAddModalShown = true
    },
    showWorkConfigureModal() {
      this.workConfModalShown = true
    },
    listenerDoneWorkConf() {
      this.workConfModalShown = false
      this.work = Store.referWork(this.wid)
    },
     listenerDoneFactorAdd() {
       this.refleshFactors()
       this.factorAddModalShown = false
    },

    emphasizeFactor(fid) {
      this.emphasizedFid = fid
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.projectLabel {
  padding-right: 20px;
  margin-right: -20px;
  border-radius: 4px 0 0 4px;
}
h3 {
  margin: 16px 0 10px 20px;
  text-align: left;
}

.miniPreview-row {
  position: absolute; left: 0; top: 0;
  width: 100%;
  height: 248px;
  /*background: #eaeaf1;*/
  border-bottom: 1px solid #f0f0f0;
}
@media (max-aspect-ratio: 3/4) {
  .miniPreview-row {
    position: fixed; left: 0; top: 0;
    box-shadow: 0 0 14px 6px white;
    z-index: 2;
  }
  .fixedBox {
    width: 100%; height: 1px;
    position: fixed; left: 0; top: 248px;
    z-index: 2;
  }
}
.miniPreview-box {
  position: relative;
  width: 200px; height: 200px;
  margin: 0 auto;
}

.previewBtn {
  position: absolute; right: 10px; bottom: 10px; text-align: right;
  /*height: 32px;*/
}

.clearBtn a {
  vertical-align: middle;
}
.clearBtn {
  color: #6d7b8a;
  width: 32px; height: 32px;
  line-height: 28px;
  padding: 0;
  border: 2px solid #858d94;
  border-radius: 8px;
}
.clearBtn:active {
  box-shadow: 0 0 8px 2px gray;
}
.pagelayout-dark .clearBtn {
  color: #cdd4dc;
  border: 2px solid #abb4bb;
}
.pagelayout-dark .clearBtn:active {
  box-shadow: 0 0 8px 2px white;
}

.subRouteSpacer {
  height: 248px;
}
.subRouteWrapper {
  position: relative;
}

.routerV {
  opacity: 1;
}

.drill-enter-active {
  transition: all .5s;
  /*background-color: lime;
  transform: rotate3d(1, -1, 1, 60deg);*/
}
/*
.drill-enter-to {
  transition: all .5s;
  background-color: red;
}
*/
/* 全て無効
.drill-appear-to {
  transition: all .5s;
  background-color: blue;
}
.drill-leave-to {
  transition: all .5s;
  background-color: gold;
}
.drill-leave, .drill-appear {
  transition: all .5s;
  background-color: yellow;
}
*/
/*
.drill-enter {

  background-color: white;
}
*/


</style>
