<template>
  <div id="app">
    <div id="app-content">
      <router-view v-on:add-error="addError" :key="$route.fullPath"/>
    </div>
    <div class="mask my-maskColor"></div>
  </div>
</template>


<script>
//    <link rel="stylesheet" type="text/css" href="@/extlib/fontawesome-free/css/all.css"/>
//    <link rel="stylesheet" href="@/extlib/siimple_custom.css"/>
//    <link rel="stylesheet" href="@/css/main.scss"/>

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      //metaValue: 'meta_value'
    }
  },
  beforeCreate() {
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

  // historyAPIによるstate変更直後のスクロール位置自動復元を無効にする
  if ('scrollRestoration' in window.history) {
    //console.log('Manual scroll restoration is exist.')
    history.scrollRestoration = 'manual'
  }

  function getMask() {
    return document.querySelector('.mask')
  }

  const msWaitDoneWhiteOut = 300,//400
        msWaitDoneFadeIn = 300;//800

  //
  appVm.$router.beforeEach((to, from, next) => {

    // Between child route, there is no effect.
    if (from.meta.isSubRoute && to.meta.isSubRoute) return next();

    // Fade-out
    let el = getMask()
    el.style.display = 'block'

    // ふつうにフェードアウトする。
    setTimeout(() => {
      el.classList.add('whiteout')
    }, 50)


    appVm.$nextTick(()=>{
      setTimeout(() => {
        next()
      }, msWaitDoneWhiteOut );
    })

  });

  //
  appVm.$router.afterEach((to, from) => {

    // Between child route, there is no effect.
    if (from.meta.isSubRoute && to.meta.isSubRoute) return;

    // Fire Original Event Hook for PageVM
    // appVm.$children.forEach( vm => {
    //   if (typeof vm.beforeStartFadeIn === 'function') {
    //     vm.beforeStartFadeIn()
    //   }
    // });

    // Fade-in
    let el = getMask()
    el.classList.remove('whiteout')
    setTimeout(() => {
      el.style.display = 'none'
    }, msWaitDoneFadeIn );

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
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh;

  opacity: 0;
  transition: opacity 0.5s;
}
.mask.whiteout {
  opacity: 1;
  transition: opacity 0.2s;
}


</style>
