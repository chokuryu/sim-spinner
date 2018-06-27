<template>
<div class="">

  <div class="my-horizontalSpacer half"></div>

  <div class="">
    <div class="spacer"></div>
    <!--<logo></logo>-->
    <div class="logoframe">
      <router-link tag="a" :to="{ name: '@=top' }">
        <img src="@/assets/logox4.png"/>
      </router-link>
    </div>
  </div>

  <div class="my-horizontalSpacer half"></div>

  <section class="doc-fullWideSection   xmy-container">
    <table class="my-commonFieldTable">
      <tr>
        <td><label class="siimple-label">Mail:</label></td>
        <td><input type="text" class="siimple-input" v-model="uid" value=""/></td>
      </tr>
      <tr>
        <td><label class="siimple-label">Password:</label></td>
        <td><input type="password" class="siimple-input" v-model="pass" value=""/></td>
      </tr>
      <tr class="">
        <td></td>
        <td>
          <div class="my-horizontalSpacer micro"></div>
          <a @click="signIn" class="siimple-btn siimple-btn--blue btn-1"
          ><i class=""></i>Log in</a>
        </td>
      </tr>
    </table>
  </section>

  <div class="my-container">
    <p class="siimple-small">* Needless to sign up. Everyone can entry with push login button.</p>
    <p class="siimple-small">* サインアップ機能はありません。ログインボタンを押すと誰でも入れます。</p>
  </div>

</div>
</template>

<script>

export default {
  name: 'LoginEntryPage',
  components: {
  },
  props: [],
  data () {
    return {
      uid: 'guest@mail.comcom',
      pass: 'guest'
    };
  },
  created() {
    //console.dir(this)
  },
  mounted() {

  },
  methods: {

    signIn() {
      // Auto confirmation があるためreplaceしないとログインセッション保持したまま戻ってきたときにunder_loginに飛ばされて戻れなくなる
      this.$router.replace({
        name: '@=under_login',
        query: {
          segueToName: '@=home'
        }
      })
    }
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
