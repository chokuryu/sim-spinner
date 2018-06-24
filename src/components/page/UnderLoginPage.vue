<template>

<div class="setup-frame my-maskColor">
  <transition name="fade">
    <div v-show="shouldFadeIn" class="logoframe" >
      <img src="@/assets/logo.png" class="logo"/>
      <div>Sign in...</div>
    </div>
  </transition>
</div>

</template>

<script>
import Resource from '@/scripts/Resource'
import Store from '@/scripts/Store';
import Logo from '../Logo'

export default {
  name: 'UnderLoginPage',
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
      let nextRouteName = this.$route.query.segueToName || '@=top'
      let a = Resource.userService.signIn('some_uid', 'some_pass')
      let b = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1500)
      });
      //
      Promise.all([
        a,
        b
      ]).then((results)=>{
        let [ serviceResult, nomean ] = results
        //console.log('Back from setup')
        console.dir(serviceResult)
        let name = serviceResult.completeSignIn ? nextRouteName : '@=top';
        this.$router.replace({ name })
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
