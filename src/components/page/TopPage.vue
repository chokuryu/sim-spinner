<template>
  <div class="doc-page">

    <div class="my-horizontalSpacer half"></div>

    <div class="">
      <div class="spacer"></div>
      <logo></logo>
    </div>

    <div class="xmy-horizontalSpacer half"></div>

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
            ><i class=""></i>Sign In</a>
          </td>
        </tr>
      </table>
    </section>

    <div class="my-horizontalSpacer large"></div>

    <section class="doc-fullWideSection my-backColor1">
      <div class="doc-toolIcons">
        <i class="fas fa-sync fa-3x doc-grayIconColor"></i>
      </div>
      <h2 class="siimple-h3">Create your spinner</h2>
      <div class="doc-content">
        <p>自分だけのスピナーをつくりましょう。シムスピナーはあなたのWeb製作シーンにおけるインディケーター作りをサポートします。</p>
        <p>このWebサイトは練習用につくったダミーのWebサービスなのでサービス登録などはできませんが、上の「Sign in」ボタンを押すとその機能を試すことができます。もし気に入ったら、いつかサービス化されるのを待ちましょう！</p>
      </div>
      <br/>
      <router-link tag="a" to="/sign_up_page" class="siimple-btn siimple-btn--orange">Sign up someday</router-link>
      <div class="my-horizontalSpacer"></div>
    </section>

    <section class="doc-fullWideSection">
      <div class="doc-toolIcons">
        <i class="fas fa-book fa-3x doc-grayIconColor"></i>
      </div>
      <h2 class="siimple-h3">Design Note</h2>
      <div class="doc-content">
        <p>このSPA（シングル・ページ・アプリケーション）は個人的なフロントエンドの練習用につくりました。どのようにデザインされているかをここに書き記しているのでぜひチェックしてみてください。</p>
      </div>
      <br/>
      <router-link tag="a" :to="{ name: '@=design' }" class="siimple-btn siimple-btn--teal">Check it</router-link>
      <div class="my-horizontalSpacer"></div>
    </section>

    <page-foot-view></page-foot-view>

  </div>
</template>


<script>
import Logo from '../Logo'
import PageFootView from '../PageFootView'

export default {
  name: 'TopPage',
  components: {
    Logo,
    PageFootView
  },
  data () {
    return {
      uid: 'guest@mail.comcom',
      pass: 'guest'
    }
  },
  props: [],
  computed: {

  },
  methods: {
    signIn() {
      this.$router.push({
        name: '@=under_login',
        query: {
          segueToName: '@=home'
        }
      })
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.spacer {
  height: 5vh;
}
.btn-1 {
  width: 108px;
}

.doc-toolIcons {
  margin: 20px 0 0 0;
}
.doc-grayIconColor {
  color: #707a8a !important;
}

/*
h2, h3 {
  margin: 6px auto 4px auto;
}


.topFoot {
  padding: 20px 0;
}
*/



</style>
