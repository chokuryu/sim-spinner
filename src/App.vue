<template>
  <div id="app">
    <div id="app-content">
      <router-view v-on:add-error="addError" :key="$route.fullPath"/>
    </div>
    <div class="mask my-maskColor"></div>
  </div>
</template>


<script>

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      //metaValue: 'meta_value'
    }
  },
  created() {
    attachFadeDuringSegue(this)
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    addError() {

    }
  }
}


/*
 * ページ遷移時のフェードアニメーションをルータのイベントに追加
 */
function attachFadeDuringSegue(appVm) {

  function getMask() {
    return document.querySelector('.mask')
  }

  //
  appVm.$router.beforeResolve((to, from, next) => {

    // Between child route, there is no effect.
    if (from.meta.isSubRoute && to.meta.isSubRoute) return next();

    // Fade-out
    let el = getMask()
    el.style.display = 'block'
    setTimeout(() => {
      el.classList.add('whiteout')
    }, 60);
    setTimeout(() => {
      next()
    }, 350 );

  });

  //
  appVm.$router.afterEach((to, from) => {

    // Between child route, there is no effect.
    if (from.meta.isSubRoute && to.meta.isSubRoute) return;

    // Fire Original Event Hook for PageVM
    //console.log('[router afterEach]')
    //console.dir(appVm)
    appVm.$children.forEach( vm => {
      if (typeof vm.beforeStartFadeIn === 'function') {
        vm.beforeStartFadeIn()
      }
    });

    // Fade-in
    let el = getMask()
    el.classList.remove('whiteout')
    setTimeout(() => {
      el.style.display = 'none'
    }, 500 );

  });
}

</script>


<style>
#app {
  background-color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  /*margin-top: 60px;*/
}
#app > img {
  width: 200px; height: 200px;
}
#app-content {
  min-width: 100vw; min-height: 100vh; position: relative;
}


.mask {
  z-index: 5000;
  display: none;
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;

  opacity: 0;
  transition: opacity 0.5s;
}
.mask.whiteout {
  opacity: 1;
  transition: opacity 0.2s;
}


</style>
