<template>

<div class="setup-frame my-maskColor">
  <transition name="fade">
    <div v-show="shouldFadeIn" class="logoframe" >
      <img src="@/assets/logo.png" class="logo"/>
      <div>Loading...</div>
    </div>
  </transition>
</div>

</template>

<script>
import Store from '@/scripts/Store';
import Logo from '../Logo'

export default {
  name: 'SetupPage',
  components: {
    Logo
  },
  props: [],
  data () {
    return {
      shouldFadeIn: false
    };
  },
  created() {
    //console.dir(this)
  },
  mounted() {
    setTimeout(()=>{
      this.fadeInLogo()
    }, 50)
    setTimeout(()=>{
      this.startLoad()
    }, 100)
  },
  methods: {

    startLoad() {
      let path = this.$route.query.redirect_to || '/'
      //let path = this.$route.meta.redirect_to || '/'
      let a = Store.initializeAsync('normal')
      let b = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1500)
      });
      //
      Promise.all([
        a,
        b
      ]).then(()=>{
        //console.log('Back from setup')
         this.$router.replace({
           //replace: true,
           path: path
         });
        //this.$router.go(-1)
      });
    },

    fadeInLogo() {
      this.shouldFadeIn = true
    }

  }
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setup-frame {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
}
.logoframe {
  position: fixed; top: 45%; left: 50%;
  width: 120px; height: 120px;
  margin: -60px 0 0 -60px;
  opacity: 1;
  transition: all 0.2s;
}
.logoframe img {
  width: 100%; height: 100%;
}
.logoframe div {
  margin-bottom: -100px;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}


</style>
