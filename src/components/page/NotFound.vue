<template>
  <div>

    <div class="my-horizontalSpacer"></div>

    <h1>{{ wrongType }}</h1>
    <div class="my-container">
      <div>
        <p><span style="font-weight:900;">{{ wrongPath }}</span> is not found.</p>
      </div>
    </div>

    <div class="my-horizontalSpacer"></div>

    <div class="my-container">
      <div class="siimple-btn siimple-btn--navy" v-on:click="segueTopPage">Top</div>
    </div>

  </div>
</template>


<script>

export default {
  name: 'NotFound',
  components: {
  },
  props: ['wrong_path'],
  data () {
    return {
      wrongType: '-',
      wrongPath: '-'
    }
  },

  created() {
    //console.log('created')
    //console.dir(this.$route)
    this.setValues(
      this.$route.query.wrongType || null,
      this.$route.query.wrongPath || null
    )
    // 初回のみ即反映
    this.reflectValues()
  },

  beforeRouteUpdate(to, from, next) {
    //console.log('updated')
    //console.dir(arguments)
    this.setValues(
      to.query.wrongType || null,
      to.query.wrongPath || null
    )
    next()

  },

  methods: {

    // App original listener to catch display update timing
    beforeStartFadeIn() {
      //console.log('beforeStartFadeIn')
      this.reflectValues()
    },

    setValues(wrongType, wrongPath) {
      if (!wrongType || !wrongPath) {
        wrongType = 404
        wrongPath = 'Page'
      } else {
        //console.dir(this.$router.history.base || '/')
        wrongPath = (this.$router.history.base || '') + wrongPath
      }
      this.hiddenValues = {
        wrongType: '' + wrongType,
        wrongPath: wrongPath
      }
    },

    // Value Reflection has to start on time when router is just before fade-in
    reflectValues() {
      if (!this.hiddenValues) return;
      this.wrongType = this.hiddenValues.wrongType
      this.wrongPath = this.hiddenValues.wrongPath
    },

    segueTopPage() {
      //this.$router.push({ path: '/' })
      this.$router.push({ name: '@=top' })
    }

  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  margin: 10px auto;
  color: #6b8290;
}
h2, h3 {
  margin: 6px auto 4px auto;
}



</style>
