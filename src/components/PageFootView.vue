<template>
<section  class="topFoot doc-fullWideSection my-backColor2">

  <div class="my-horizontalSpacer"></div>

  <div class="whatIs">
    <router-link tag="a" :to="{ name: '@=top' }">
      <img src="@/assets/logo.png"/>
    </router-link>
    <!--<span class="siimple-h3">SimSpinner</span>-->
    <span class="doc-logoType">SimSpinner</span>
  </div>

  <p class="attention">This is a dummy web service for my design practice.</p>

  <div class="my-horizontalSpacer"></div>

  <div class="my-container">
    <span>© 2018 - Naotaka Kanai - All rights reserved</span>
  </div>

</section>
</template>

<script>

export default {
  name: 'PageFootView',
  components: {

  },
  props: [],
  data () {
    return {}
  },
  computed: {

  },
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topFoot {
  /*padding: 20px 0;*/
  color: #39649e;
}
.whatIs {
  display: flex; justify-content: center;
  width: 280px; height: 76px; line-height: 60px;
  padding: 8px;
  margin: auto;
  /*background: white;*/
  border-radius: 38px;
  background-color: #39649e;
}
.whatIs img {
  width: 60px;
  height: 60px;
}
.whatIs span {
  height: 60px;
  margin: 0;
  margin-left: 12px;
  text-decoration-line: none;
}
.attention {
  font-weight: 600;
}
</style>
