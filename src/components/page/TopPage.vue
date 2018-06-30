<template>
  <div class="doc-page">

    <doc-navi-bar-view></doc-navi-bar-view>

    <section class="doc-fullWideSection topback-landing" >

      <div class="my-horizontalSpacer large"></div>
      <div class="my-horizontalSpacer large"></div>

      <div class="doc-topback-texts">
        <h1 class="siimple-h1">Create and manage your original spinner</h1>
        <div class="">
          <p>自分だけのスピナーをつくりましょう。シムスピナーはあなたのWeb製作シーンにおけるスピナー作りをサポートするツールです。</p>
        </div>
        <br/>
        <a @click="sgueToSignUpEntry"  class="siimple-btn siimple-btn--yellow">Get started for free</a>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>

    <div class="my-horizontalSpacer"></div>

    <section class="doc-fullWideSection">
      <div class="my-horizontalSpacer"></div>
      <div style="color:#d5e2f5;">
        <span class="fa-stack fa-4x">
          <i class="fas fa-circle fa-stack-2x"></i>
          <i class="fas fa-child fa-stack-1x fa-inverse"></i>
        </span>
      </div>
      <h2 class="siimple-h3">There is no service available here</h2>

      <div class="doc-content">
        <p>このWebサイトは実験用につくったダミーのWebサービスなのでサービス登録などはできません。ただ、誰でもログイン画面から入って機能を試すことができますので遊んでみてください。もし気に入ったら、いつか製品化されるのを待ちましょう！</p>
      </div>

      <br/>
      <a @click="sgueToLoginEntry" class="siimple-btn siimple-btn--teal">Try it now</a>
      <div class="my-horizontalSpacer"></div>
    </section>

    <section class="doc-fullWideSection my-backColor1">
      <div class="my-horizontalSpacer"></div>
      <div style="color:#a8c8ea;">
        <span class="fa-stack fa-4x">
          <i class="fas fa-square fa-stack-2x fa-inverse"></i>
          <i class="fas fa-book fa-stack-1x"></i>
        </span>
      </div>
      <h2 class="siimple-h3">Production note</h2>
      <div class="doc-content">
        <p>SimSpinnerは個人的なSPA制作の実験用としてつくりました。制作内容について一部をここに書き記しているのでぜひチェックしてみてください。</p>
      </div>
      <br/>
      <router-link tag="a" :to="{ name: '@=design' }" class="siimple-btn siimple-btn--teal">Check features</router-link>
      <div class="my-horizontalSpacer"></div>
    </section>

    <page-foot-view></page-foot-view>

  </div>
</template>


<script>
import DocNaviBarView from '../DocNaviBarView'
import PageFootView from '../PageFootView'

export default {
  name: 'TopPage',
  components: {
    DocNaviBarView,
    PageFootView
  },
  data () {
    return {

    }
  },
  props: [],
  computed: {

  },
  methods: {
    sgueToLoginEntry() {
      this.$router.push({ name: '@=login_entry' })
    },
    sgueToSignUpEntry() {
      this.$router.push({ name: '@=sign_up_entry' })
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



.doc-toolIcons {
  margin: 20px 0 0 0;
}
.doc-grayIconColor {
  color: #707a8a !important;
}

/*
*/

.topback-landing {
  background-color: #3f79bb;
  /*background-image: linear-gradient(356deg, #ffffff, #ffffff, #c8def9, #7eb4f1, #4a99ff);*/
  /*background-image: linear-gradient(356deg, #ffffff, #ffffff, #ffffff, #c8def9, #3f79bb, #1a254a);*/
  background-image: linear-gradient(356deg, #ffffff, #ffffff, #ffffff, #c8def9, #3f8abb, #1a254a);
  padding-bottom: 400px;
  margin-bottom: -400px;
}






</style>
