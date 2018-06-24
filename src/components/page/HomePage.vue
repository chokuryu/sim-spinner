<template>
  <div>

    <div class="my-horizontalSpacer x2"></div>

    <div class="pagelayout-navi">
      <div class="naviframe naviframe-white">
        <div class="naviframe-left">
          <a class="logoFrame" v-on:click="segueToTop">
            <img src="@/assets/logo.png"/>
          </a>
        </div>
        <div class="naviframe-right">
          <!-- User name -->
          <span class="" style="font-size:1rem;">Guest</span>
          <!-- User avater -->
          <span
            @click="modalUserProfileShown = true"
            class="my-roundBtn siimple-btn siimple-btn--grey"
          >
            <i class="far fa-user"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="projectsHeader">
      <h2>Projects</h2>
      <!--<span></span>-->
      <a @click="addProject" class="siimple-btn siimple-btn--teal my-roundBtn2"
      ><i class="fas fa-plus"></i></a>
    </div>
    <div class="my-container">

      <transition-group tag="ul" name="fade">
        <li
          v-for="work in workArr" :key="work.id"
          class="workBox my-mOverBlue"
          :class="{ 'pagelayout-dark' : work.isDark }"
          v-on:click="segueWorkPage(work.id)"
        >
          <div class="workViewFrame bg-pattern-check">
            <div class="zoomed">
              <vision-view v-bind:wid="work.id" v-bind:fid-list="work.ownFactors" no-animation></vision-view>
            </div>
          </div>
          <div class="workTitleFrame">
            <a class="my-title my-title-pale">{{ work.name }}</a>
          </div>
        </li>
      </transition-group>

<!--
      <div class="my-horizontalSpacer half"></div>

      <div class="siimple-grid-row factorListItem factorListItem2">
        <div class="siimple-grid-col siimple-grid-col--12">
          <a @click="addProject" class="siimple-btn siimple-btn--teal my-btnWideFit"
          ><i class="fas fa-plus"></i> Project</a>
        </div>
      </div>
-->

    </div>

    <div class="my-horizontalSpacer large"></div>

    <h3>Status</h3>
    <div class="my-container">LS: <span v-if="canUseLocalStorage">YES</span><span v-else>NO</span></div>

    <div class="my-horizontalSpacer"></div>

    <modal-user-profile :shown="modalUserProfileShown"
    @done="modalUserProfileShown = false"/>

  </div>
</template>


<script>
import Store from '@/scripts/Store'
import VisionView from '../VisionView.vue'
import ModalUserProfile from '../ModalUserProfile.vue'


function getWorkArr() {
  let works = Store.referWorkDict()
  let workArr = Object.keys(works).map((wid) => {
    works[wid].id = wid
    return works[wid]
  });
  return workArr
}

export default {
  name: 'HomePage',
  components: {
    VisionView,
    ModalUserProfile
  },
  data () {
    return {
      canUseLocalStorage: Store.canUseLocalStorage(),
      workArr: getWorkArr(),
      modalUserProfileShown: false
    }
  },
  props: [],
  computed: {

  },
  methods: {
    segueToTop() {
      //this.$router.push({ path: '/' })
      this.$router.push({ name: '@=top' })
    },
    segueWorkPage(wid) {
      //this.$router.push({ path: `/work/${wid}` })
      this.$router.push({ name: '@=work>work_content', params: { wid } })
    },
    addProject() {
      Store.addWork()
      this.workArr = getWorkArr()
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.logoFrame {
  display: block;
  width: 40px; height: 40px;
  margin: 14px 0 0 -2px;
}
.logoFrame:active {
  background-color: lightgray;
}
.logoFrame img {
  width: 100%; height: 100%;
}

.projectsHeader {
  margin: 36px 0 16px;
  vertical-align: sub;
}
.projectsHeader > h2 {
  display: inline-block;
  margin-left: 42px;
  margin-right: 12px;
  /*vertical-align: sub;*/
}
.my-roundBtn2 {
  width: 28px;
  padding: 0;
  border-radius: 14px;
  height: 28px;
  line-height: 30px;
  vertical-align: baseline;
}

h2, h3 {
  margin: 6px auto 4px auto;
}

ul {
  margin: 6px 0;
}
.workBox {
  display: inline-block;
  width: 154px; height: auto;
  padding: 6px;
  margin: 10px;
  border: 1px solid lightgray;
  border-radius: 0px;
  vertical-align: top;
  opacity: 1;
  transition: opacity 0.8s;
}
@media screen and (min-width:0px) and (max-width:380px) {
  /* device-widthが380px以下だと 1列になってしまうので */
  .workBox {
    zoom: 0.85;
  }
}
.workBox:active {
  background: #f2f4f7;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.workViewFrame {
  width: 140px; height: 100px;
  border: 1px solid #ddd;
  overflow: hidden;
}
.zoomed {
  width: 280px; height: 200px;
  zoom: 0.5;
}

.workTitleFrame {
  border: 1px solid transparent;
  word-break: break-all;
  margin-top: 4px;
  /*color: #666;*/
}
.workTitleFrame a {
  font-size: 0.9rem;
}



</style>
