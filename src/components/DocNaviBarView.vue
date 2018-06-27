<template>
<section  class="docnavi-topHead">

  <div
    class="docnavi-cover"  :class="{ 'open' : isOpening }"
  ></div>

  <div class="docnavi-leftBlock">
    <router-link tag="a" :to="{ name: '@=top' }">
      <img src="@/assets/logo.png"/>
    </router-link>
    <span class="doc-logoType">SimSpinner</span>
  </div>

  <div class="docnavi-rightBlock">
    <div class="docnavi-listContainer" :class="{ 'open' : isOpening }">
      <ul class="docnavi-list1">
        <li class="docnavi-left">
          <router-link tag="a" :to="{ name: '@=design' }">Features</router-link>
        </li>
        <li class="docnavi-left">
          <a>Somelink</a>
        </li>
        <li class="docnavi-left">
          <a>Some</a>
        </li>
      </ul>
      <ul class="docnavi-list2">
        <li class="docnavi-left">
          <a @click="sgueToLoginEntry">Log in</a>
        </li>
        <li class="docnavi-left">
          <a @click="sgueToSignUpEntry" class="docnavi-signUpLink">Sign up</a>
        </li>
      </ul>
    </div>
    <div class="menuBtnBox">
      <button @click="openMenu" class="siimple-btn siimple-btn--blue">
        <i class="fas" :class="[ isOpening ? 'fa-times' : 'fa-bars' ]"></i>
      </button>
    </div>
  </div>

  <div class="docnavi-topHeadBottom"></div>

</section>
</template>

<script>

export default {
  name: 'DocNaviBarView',
  components: {

  },
  props: [],
  data () {
    return {
      isOpening: false
    }
  },
  computed: {

  },
  methods: {
    openMenu() {
      this.isOpening = !this.isOpening;
    },
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




</style>
