<template>
  <div>

    <div class="my-horizontalSpacer"></div>

    <h1>Out of session</h1>
    <div class="my-container">
      <div>
        <p>You need a new web session. Please sign in from front page.</p>
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
  name: 'NeedSignInPage',
  components: {
  },
  props: [],
  data () {
    return {
    }
  },

  created() {
  },

  methods: {

    segueTopPage() {
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



</style>
