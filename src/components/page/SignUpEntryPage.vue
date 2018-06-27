<template>
<div class="">

  <div class="my-horizontalSpacer half"></div>

  <div class="">
    <div class="spacer"></div>
    <div class="logoframe">
      <router-link tag="a" :to="{ name: '@=top' }">
        <img src="@/assets/logox4.png"/>
      </router-link>
    </div>
  </div>

  <div class="my-horizontalSpacer half"></div>

  <div class="my-container">
    <p class="">* Needless to sign up. Everyone can entry from login page.</p>
    <p class="">* サインアップ機能はありません。誰でもログイン画面から入れます。</p>
  </div>

  <div class="my-horizontalSpacer half"></div>

  <div>
    <router-link tag="a" :to="{ name: '@=login_entry' }" class="siimple-btn siimple-btn--yellow"><i class="fas fa-arrow-right"></i><span>&nbsp;Log in</span></router-link>
  </div>

</div>
</template>

<script>

export default {
  name: 'SignUpEntryPage',
  components: {
  },
  props: [],
  data () {
    return {

    };
  },
  created() {
    //console.dir(this)
  },
  mounted() {

  },
  methods: {

  }
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spacer {
  height: 5vh;
}
.logoframe img {
  width: 100px; height: 100px;
}
.btn-1 {
  width: 108px;
}


</style>
