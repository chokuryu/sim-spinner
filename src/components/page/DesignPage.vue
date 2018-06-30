<template>
  <div class="doc-page">

    <!-- Head -->

    <doc-navi-bar-view></doc-navi-bar-view>

    <section class="doc-fullWideSection topback-design" >

      <div class="my-horizontalSpacer large"></div>
      <div class="my-horizontalSpacer large"></div>

      <div class="doc-topback-texts">
        <h1 class="siimple-h1">Features - This page is only a production note</h1>
        <div class="">
          <p>このSPAのつくりやツールについて書いています。自分用のメモでもあります。</p>
        </div>
        <br/>
      </div>
    </section>



    <div class="my-horizontalSpacer x2"></div>

    <!-- Main -->

    <section class="doc-fullWideSection">
      <h2 class="siimple-h3">Responsive SPA</h2>
      <div class="doc-content">
        <div class="pictFrame">
          <img src="@/assets/about/res.png"/>
        </div>
        <p>メインユースにモバイルを想定し、部分的にPCに合わせるデザインにしてみました。縦スクロールを有効利用するため、SPAらしいフルスクリーン画面にはこだわっていません。</p>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>

    <section class="doc-fullWideSection my-backColor1">
      <h2 class="siimple-h3">Screen Transitions</h2>
      <div class="doc-content">
        <div class="pictFrame">
          <img src="@/assets/about/transition.png" xstyle="box-shadow: 0 0 12px #dfe8f1;"/>
        </div>
        <div class="my-horizontalSpacer mini"></div>
        <p>上図はルーティングと画面の主だった対応関係をまとめたものです。静的なHTMLとSPAの機能はまとめてWebpackでビルドしています。( / と /design はプリレンダリング)</p>
        <p>SPAのルーティング上のみで提供するルート(ディレクトリもファイルもない)はそのままではHTTPリクエストには対応しないため、/SPA/配下にパスをまとめておき、それらのパスへのHTTPリクエストに対しては静的ファイルサーバで/_spa.htmlというファイルを参照するようにプロキシを設定しています。</p>
        <p class="siimple-small">（＊しかしプリレンダリングを試してはみたものの、SEO対応ありの通常ページとSPAとはできれば分離したほうが納まりが良さそう。）</p>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>

    <section class="doc-fullWideSection">
      <h2 class="siimple-h3">Saving data in LocalStorage</h2>
      <div class="doc-toolIcons">
        <i class="fas fa-hdd fa-5x" style="color:#9bb6e0;"></i>
      </div>
      <div class="doc-content">
        <p>このWebアプリではブラウザのLocalStorageにユーザの作業データを保持させています。</p>
        <p>VM上のデータ連携のしかたはVuex(Fluxライクなしくみ)を使わずに、Storeオブジェクトを用いて値をコンポーネント間で共有しているだけです。（そして適時LocalStorageに保存しています。）</p>
      </div>
      <div class="my-horizontalSpacer"></div>
    </section>

    <!-- Tool -->

    <section class="doc-fullWideSection my-backColor1">

      <h2 class="siimple-h3">Impression for Tools</h2>
      <div class="doc-content">

        <table class="doc-normalTable toolTable">
          <tr><th colspan="2">Client-Side Framework, Build tool</th></tr>
          <tr>
            <td>
              <img class="toolIcon" src="@/assets/about/vue.png"/>
              <div>Vue</div>
            </td>
            <td>
              <p>Vueはスタンドアローン構成で何度か使ってきたが、今回はvue-cliで生成した雛形をそのまま利用して全てjsに事前コンパイルする構成を試したかった。</p>
              <p>単一ファイルコンポーネントもはじめて使ったが、別途JS,SCSSファイルも普通に併用できて意外と柔軟だった。テストツールは試していないけど、vue-loaderなどの処理が介在するぶん複雑になる気がする。</p>
            </td>
          </tr>
          <tr>
            <td>
              <img class="toolIcon" src="@/assets/about/webpack.png"/>
              <div>Webpack</div>
            </td>
            <td>
              <p>vue-cli生成のconfigの構成をあまり変えずにそのまま利用。vue-loaderや各種pluginによる処理の全体像がいまだにはっきりわからない。</p>
              <p>それでも、標準的な使い方からあまり外れなければ素直に動いてくれて快適。</p>
          </td>
          </tr>
        </table>

        <div class="my-horizontalSpacer large"></div>

        <table class="doc-normalTable toolTable">
          <tr><th colspan="2">UI Library</th></tr>
          <tr>
            <td>
              <img class="toolIcon" src="@/assets/about/siimple.png"/>
              <div><a href="https://www.siimple.xyz">Siimple</a></div>
            </td>
            <td><p>CSSフレームワーク。スクリプトを用いないのでVueと合わせる上でクリーンなのは良い。prefixがちょっと長い(siimple-)。</p>
            </td>
          </tr>
          <tr>
            <td>
              <i class="toolIcon fab fa-font-awesome awesomeblue" style="font-size: 4em; line-height: 80px;"></i>
              <div>Font Awesome</div>
            </td>
            <td><p>フォントアイコン。よく使う。今回はWebpackに組み込む上であまりしっくりこなかったのだが、実はアイコンをVueコンポーネントとして使う方法が提供されているようなのでそのうち試してみたい。</p></td>
          </tr>
        </table>

        <div class="my-horizontalSpacer large"></div>

        <table class="doc-normalTable toolTable">
          <tr><th colspan="2">Deployment and Source Management</th></tr>
          <tr>
            <td>
              <img class="toolIcon" src="@/assets/about/netlify.svg" style="padding: 10px"/>
              <div><a href="https://www.netlify.com">Netlify</a></div>
            </td>
            <td>
              <p>どこに公開しようか迷っていたのだがこのサービスを使ってみたらすごく良かった。私のGitHubのproductionリポジトリにpushするとでNetlifyのサービス側でそれを検知し、任意のビルドコマンドを実行してくれて、デプロイが終わる。<br/>
            （例として、このプロジェクトではビルドコマンドに<span class="siimple-code">node build/build.js</span>を指定し、dist/ を公開ディレクトリに指定している。）</p>
              <p></p>
            </td>
          </tr>
          <tr>
            <td>
              <img class="toolIcon" src="@/assets/about/github.png" style="padding: 10px"/>
              <div>GitHub</div>
            </td>
            <td><p>あまり使っていない。Netlifyと合わせてもうちょい活用したい。今回のプロジェクトはプライベートリポジトリに入れてある。</p></td>
          </tr>
        </table>

      </div>

      <div class="my-horizontalSpacer"></div>
    </section>


    <section class="doc-fullWideSection">
      <h2 class="siimple-h3">Logo</h2>
      <div class="bigLogoFrame"><img src="@/assets/logox4.png"/></div>
      <div class="my-horizontalSpacer micro"></div>
      <div class="doc-content">
        <p>おまけ。ロゴは Affinity Designer で描きました。まあグラフィックはほとんど書かないので適当です。小さいサイズで表示するとすごく微妙…。</p>
      </div>
      <!--<div class="doc-pencilLine">
        <i class="fa fa-pencil-alt"></i>
        <span style="padding-right: 20px;">wrriten with Affinity Designer</span>
      </div>-->
      <div class="my-horizontalSpacer"></div>
    </section>


    <page-foot-view></page-foot-view>

  </div>
</template>


<script>
import DocNaviBarView from '../DocNaviBarView'
import PageFootView from '../PageFootView'

export default {
  name: 'DesignPage',
  components: {
    DocNaviBarView,
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

.topback-design {
  background-color: #3f79bb;
  /*background-image: linear-gradient(356deg, #ffffff, #ffffff, #ffffff, #c8ebf9, #3f8dbb, #1a254a);*/
  background-image: linear-gradient(356deg, #ffffff, #ffffff, #f5fcfd, #98c6ff, #5e96e8, #1a254a);
  padding-bottom: 200px;
  margin-bottom: -200px;
}
.bigLogoFrame > img {
  width: 200px; height: 200px;
}

h2 {
  margin: 40px;
}

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
  color: #228ae6;
/*  background-image: linear-gradient(315deg, #2b79d2, #64b0ff);
  color:transparent;
  -webkit-background-clip: text;
  background-clip: text;*/
}


.toolTable td:first-child {
  width: 120px;
}
.toolIcon {
  width: 80px; height: 80px;
  margin-bottom: 10px;
}





</style>
