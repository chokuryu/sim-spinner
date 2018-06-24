<template>
  <div
    class="pagelayout-outer" :class="{ 'pagelayout-dark' : work.isDark }"
  >
    <div class="pagelayout-navi">
      <div class="naviframe naviframe-gray">
        <div class="naviframe-left">
          <a class="siimple-btn siimple-btn--navy" v-on:click="back"><i class="fas fa-chevron-left"></i></a>
          <span class="my-title">&nbsp;&nbsp;{{ work.name }}</span>
        </div>
        <div class="naviframe-right"></div>
      </div>
    </div>

    <div class="pagelayout-l">
      <div class="vision-outer bg-pattern-check">
        <vision-view v-bind:wid="wid" v-bind:fid-list="fidList"></vision-view>
      </div>
    </div>

  </div>
</template>

<script>
import Store from '@/scripts/Store'
import VisionView from '@/components/VisionView.vue'

export default {
  name: 'PreviewPage',
  components: {
    VisionView
  },
  props: ['wid'],
  data () {
    let work = Store.referWork(this.wid)
    let fidList = Store.getFactorIdListOf(this.wid)
    return {
      work,
      fidList
    }
  },
  props: ['wid'],
  computed: {

  },
  methods: {
    back() {
      //this.$router.go(-1)
      //this.$router.push({ path: `/work/${this.wid}/` })
      this.$router.replace({ name: '@=work>work_content', params: { wid: this.wid } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
