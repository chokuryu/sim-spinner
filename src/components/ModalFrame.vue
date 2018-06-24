<template>
<transition name="fade">
  <div class="cover" v-if="shown">
    <div class="outerFrame" :class="{ rising : contentShowing }">
      <div class="innerFrame">

        <h3><slot name="header"></slot></h3>

        <section>
          <slot name="main"></slot>
        </section>

        <section class="bottomArea">
          <slot name="footer"></slot>
        </section>
      </div>
      <div v-if="closeBtn !== 'false'" class="closeBtn fas fa-times-circle fa-2x" v-on:click="close"></div>
    </div>
  </div>
</transition>
</template>

<script>

export default {
  name: 'ModalFrame',
  props: ['shown', 'closeBtn'],
  data () {
    return {
      contentShowing: false
    }
  },
  created() {

  },
  watch: {
    // true で表示する
    shown(val) {
      if (val === true) {
        setTimeout(()=>{ this.contentShowing = true; }, 100)
      } else {
        this.contentShowing = false;
      }
    }
  },
  methods: {
    close() {
      this.$emit('closing')
    }
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



.cover {
  z-index: 1000;
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.5);
  /* 親要素にスクロールが伝わらないようにする */
  overscroll-behavior: contain;
  /* ソフトウェアキーボード対策 */
  overflow: auto;
}
.fade-enter-active {
  opacity: 1;
  transition: all 0.5s;
}
.fade-leave-active {
  opacity: 1;
  transition: all 0.25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.outerFrame {
  position: absolute; top: 100vh; left: 5%;
  width: 90%; height: 90%;
  background-color: white;
  border-radius: 20px;
  /* ソフトウェアキーボード対策 */
  min-height: 500px;

}
.rising {
  top: 5%;
  transition: top 0.4s cubic-bezier(0, 0, 0.01, 0.99);
}

.innerFrame {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  padding: 40px 0;
  overflow: auto;
}

.closeBtn {
  position: absolute; top: 10px; right: 10px;
  width: 40px; height: 40px;
  border-radius: 10px; background-color: transparent;
  line-height: 40px;
  color: lightgray;
}

.bottomArea {
  /*background-color: blue;*/
  position: absolute; bottom: 0; left: 0px;
  width: calc( 100% - 0px ); height: 120px;
  border-top: 1px solid lightgray;
}

</style>
