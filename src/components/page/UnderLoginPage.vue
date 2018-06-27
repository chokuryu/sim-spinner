<template>

<div class="setup-frame my-maskColor">
  <transition name="fade">
    <div v-show="shouldFadeIn" class="logoframe" >
        <div class="factor-frame">
          <div class="factor-item-circle spinner-CIRCLE-f_21"></div>
        </div>
      <!--
      <img src="@/assets/logo.png" class="logo"/>
      <div>Sign in...</div>
      -->
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
      let nextRouteName = this.$route.query.segueToName || '@=home'
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
        this.$router.replace({
          name,
          replace: true
        })
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





/* Spinner - Common */

.factor-frame {
  position: relative;
  width: 100%; height: 100%;

  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: normal;
}
.factor-frame div{
  box-sizing: border-box;
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
  text-align: center;
}

.factor-item-rect {
  z-index: 101;
  top: 50%; left: 50%;
  position: absolute;
}

/* Spinner - By Element */

.spinner-CIRCLE-f_21 {
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  border-radius: 40px;
  border-width: 6px;
  border-color: rgb(141, 169, 216 );
  border-right-color: transparent;
  animation-duration: 1.1s;
}

</style>
