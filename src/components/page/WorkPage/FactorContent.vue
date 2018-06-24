<template>
  <div
    class="factorContent" :class="{ 'pagelayout-dark' : work.isDark }"
    @click="closePullDown($event)"
  >

    <!--Factor Status Bar-->
    <div class="factorStatusBar-frame my-backColor1">

      <div class="factorStatusBar-left">
        <!-- back button -->
        <div class=" siimple-btn siimple-btn--grey" v-on:click="back"><i class="fa fa-caret-left"></i></div>
      </div>

      <div class="factorStatusBar-center">
        <!-- factor name -->
        <span class="factorNameSpan my-title my-title-black">
          <factor-type-icon v-bind:factortype="factor.type"></factor-type-icon>
          <span>&nbsp;{{ factor.name }}</span>
        </span>
      </div>

      <div class="factorStatusBar-right">
        <!-- pull down button -->
        <a class="siimple-btn siimple-btn--grey" v-on:click.stop="togglePullDown">
          <i class="fas" :class="[ isPullDownShown ? 'fa-angle-down' : 'fa-angle-up' ]"></i>
        </a>
      </div>

    </div>

    <!-- pull down menu -->
    <transition name="fade"><div v-show="isPullDownShown" class="pullDownFrame">
      <div>
        <div style="height:4px;"></div>
        <div>[ID] {{ fid }}</div>
        <div style="height:12px;"></div>
        <div class="siimple-btn siimple-btn--red" v-on:click="deleteFactor">
          <i class="fas fa-trash"></i><span> Remove</span>
        </div>
      </div>
    </div></transition>

    <!--Editorial By Factor Type-->
    <section class="editorFrame my-paramList">
      <component :is="editorComponentByType" :fid="fid" class="editorFrameInner"></component>
    </section>

  </div>
</template>

<script>
import Store from '@/scripts/Store'
import CircleEditorView from '@/components/CircleEditorView.vue'
import TextEditorView from '@/components/TextEditorView.vue'
import RectEditorView from '@/components/RectEditorView.vue'
import FactorTypeIcon from '@/components/FactorTypeIcon.vue'

export default {
  name: 'FactorContent',
  components: {
    CircleEditorView,
    TextEditorView,
    RectEditorView,
    FactorTypeIcon
  },
  props: ['wid', 'fid', 'updationIndex'],
  data () {
    let work = Store.referWork(this.wid)
    let factor = Store.referFactor(this.fid)
    let data = {
      factor,
      work,
      editorComponentByType: (
        factor.type === 'CIRCLE' ? CircleEditorView :
        factor.type === 'TEXT' ? TextEditorView :
        factor.type === 'RECT' ? RectEditorView :
        ''
      ),
      isPullDownShown: false,
      isRaiseEditorView: false
    }
    return data
  },
  mounted() {
    document.querySelector('html').scrollTop = 1;
    this.$emit('emphasizeFactor', this.fid)
  },
  watch: {
    // // To update, updationIndex should be increaded.
    // updationIndex() {
    //   this.refleshFactors()
    // }
  },
  methods: {
    // reflesh() {

    // },
    back() {
      this.$router.replace({ name: '@=work>work_content', params: { wid: this.wid } })
    },
    togglePullDown() {
      this.isPullDownShown = !this.isPullDownShown;
    },
    closePullDown($event) {
      if (this.isPullDownShown) this.isPullDownShown = false
    },
    toggleEditorView() {
      document.querySelector('.mobile-toggle-btn-frame').classList.add('btnAction')
      this.isRaiseEditorView = !this.isRaiseEditorView
      setTimeout(()=>{
        document.querySelector('.mobile-toggle-btn-frame').classList.remove('btnAction')
      }, 500 )
    },
    deleteFactor() {
      var res = window.confirm( `Delete? ${this.fid}` );
      if (!res) return;
      Store.deleteFactor(this.wid, this.fid)
      this.back()
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.drill-enter {
  opacity: 0.2;
  transform: translate(0, 0px);
  /*transform: translate(50px, 0);*/
  /*transform: translate3d(20px, 20px, -500px) rotate3d(0, 1, 0, 180deg);*/
}

.factorContent {
  position: relative;
  /*height: calc(100vh - 248px);*/
}

.factorStatusBar-frame {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*position: fixed; left: 0; top: 248px;*/
  position: relative;
  width: 100%; height: 48px;
  padding: 0 20px;
  border: 1px solid whitesmoke;
  /*z-index: 3;*/
}

.factorStatusBar-left {

}

.factorStatusBar-center {
  height: 40px;
  line-height: 40px;
}

.factorStatusBar-right {

}


.factorNameSpan {
  font-size: 1.0rem;
  padding: 4px 12px;
  margin: 0 4px 0 0;
  border-radius: 4px;
  vertical-align: middle;
/*  font-family: "helvetica Neue";
  font-weight: 500;*/
}
.pullDownFrame {
  position: relative;
  height: 108px; overflow: hidden;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: #546778;
  line-height: normal;
  border: 1px solid white;
  background: #e4eaf1;
  opacity: 1;
/*  box-shadow: #0000001a 0px 0px 4px;
/  border-radius: 5px;
/  top: 58px;
/  left: 20px;
/  */
  transition: height 0.3s, opacity 0.3s;
}
.pullDownFrame > div {
  height: 108px; padding: 10px;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  height: 1px;
  transition: height 0.5s, opacity 0.5s;
}
.pullDownFrame .siimple-btn {
  /*width: 100%;*/
}

.editorFrame {
  position: relative;
  padding-top: 10px;
  /*overflow: scroll;*/
  /* 親要素にスクロールが伝わらないようにする */
  /*overscroll-behavior: contain;*/
}

.editorFrameInner {
  height: auto;
  padding: 10px 0 20px 0;
}

.siimple-input {
  line-height: normal;
}


</style>
