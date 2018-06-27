<template>
  <div>

    <div class="my-horizontalSpacer"></div>

    <h1>Out of session</h1>
    <div class="my-container">
      <div>
        <p>You need a new web session. Please log in from below.</p>
      </div>
    </div>

    <div class="my-horizontalSpacer"></div>

    <div class="my-container">
      <router-link tag="a" :to="{ name: '@=login_entry' }" class="siimple-btn siimple-btn--yellow"><i class="fas fa-arrow-right"></i><span>&nbsp;Log in</span></router-link>
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
      this.$router.push({ name: '@=login_entry' })
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
