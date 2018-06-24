<template>
  <div class="doc-page">

    <div class="my-horizontalSpacer large"></div>

    <div><img src="@/assets/logo.png"/></div>
    <div class="my-horizontalSpacer micro"></div>

    <section class="doc-headline">
      <i class="fa fa-pencil-alt"></i>
      <h1 style="padding-right: 20px;">Design Note</h1>
    </section>

    <div class="my-horizontalSpacer x2"></div>

    <section class="doc-fullWideSection my-backColor1">
      <h2 class="siimple-h3">Responsive SPA</h2>
      <div class="doc-content">
        <div class="pictFrame">
          <img src="@/assets/about/res.png"/>
        </div>
        <p>メインユースにモバイルを想定し、部分的にPCに合わせるデザインにしてみました。縦スクロールを有効利用するため、SPAらしいフルスクリーン画面にはこだわっていません。</p>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>

    <section class="doc-fullWideSection">
      <h2 class="siimple-h3">Routing and Screen</h2>
      <div class="doc-content">
        <div class="pictFrame">
          <img src="@/assets/about/transition.png" style="box-shadow: 0 0 12px #dfe8f1;"/>
        </div>
        <p>上図はルーティングと画面の対応関係をまとめたものです。静的なページとSPAの両方をVueのフレームワークでまとめてビルドしています。URL一致のしくみや、プレレンダリングによる静的HTML出力を試しています。</p>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>

    <section class="doc-fullWideSection my-backColor1">
      <h2 class="siimple-h3">Data Store</h2>
      <div class="doc-toolIcons">
        <i class="fas fa-hdd fa-3x doc-grayIconColor"></i>
      </div>
      <div class="doc-content">
        <p>データ永続化にはブラウザのLocalStorageを使っています。</p>
        <p>プログラム上のVMとのデータ連携はVuex(Fluxライク)などは使わずに、Storeオブジェクトを用いる簡易的なモジュールをスクラッチしました。</p>
        <p class="siimple-small">（このWebアプリは静的ファイルサーバのみで動作しているただのプロトタイプです。サーバサイドもDBもありません。ユーザセッションもないのでサインインの処理もありません。）</p>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>


    <section class="doc-fullWideSection">
      <h2 class="siimple-h3">Framework, Build Tool</h2>
      <div class="doc-content">
        <div class="doc-toolIcons">
          <img src="@/assets/about/vue.png"/>
          <img src="@/assets/about/webpack.png"/>
        </div>
        <table class="doc-normalTable">
          <tr>
            <td>Vue.js</td>
            <td><p>vue-cli生成の雛形を使ったが、そのままでもわりと融通がきく。デフォルトのvue-routerを拡張していくだけでもSPAの構造が簡単につくれるので手軽。Vueの単一ファイルコンポーネントを使ったが、単独のJS,SCSSファイルも普通に併用した。</p></td>
          </tr>
          <tr>
            <td>Webpack</td>
            <td><p>vue-loaderなどの動作を把握しきれずに怖さを感じたものの、構成をシンプルに保てばなんとでもなりそうに感じる。</p></td>
          </tr>
        </table>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>

    <section class="doc-fullWideSection my-backColor1">
      <h2 class="siimple-h3">Frontend UI Library</h2>
      <div class="doc-content">
        <div class="doc-toolIcons">
          <img src="@/assets/about/siimple.png"/>
          <i class="fab fa-fort-awesome-alt fa-3x awesomeblue"></i>
        </div>
        <table class="doc-normalTable">
          <tr>
            <td>Siimple</td>
            <td><p>スクリプトを用いないCSSフレームワーク。シンプルで使いやすい。prefixがちょっと長い(siimple-)。</p></td>
          </tr>
          <tr>
            <td>Font Awesome</td>
            <td><p>手軽なアイコンフォント。</p></td>
          </tr>
        </table>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>

    <page-foot-view></page-foot-view>

  </div>
</template>


<script>
import PageFootView from '../PageFootView'

export default {
  name: 'DesignPage',
  components: {
    PageFootView
  },
  data () {
    return {
    }
  },
  mounted() {

    // クリックすると画像を表示
    let clickListener = function(ev) {
      let el = ev.target
      let src = el.getAttribute('src')
      console.log(src)
      window.location = src
    };
    document.querySelectorAll('.pictFrame > img').forEach(el => {
      el.addEventListener('click', clickListener, false)
    });

  },
  props: [],
  computed: {

  },
  methods: {

  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.pictFrame {
  display: block;
  width: 100%;
  /*max-width: 600px;*/
  margin: auto;
  /*background-color: #fefeff;*/
}
.pictFrame > img {
  width: 100%;
}
.pictFrame > img:hover {
  /*cursor: pointer;*/
  opacity: 1;
}
.pictFrame > img:active {
  opacity: 0.6;
}

.awesomeblue {
  background-image: linear-gradient(315deg, #2b79d2, #64b0ff);
  color:transparent;
  -webkit-background-clip: text;
  background-clip: text;
}



</style>
