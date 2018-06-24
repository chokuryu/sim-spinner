<template>
<div class="inner-frame">
  <img src="@/assets/logo.png" class="logo"/>
  <h1>SimSpinner</h1>
</div>
</template>

<script>

export default {
  name: 'Logo',
  props: [],
  data () {
    return {
    }
  },
  methods: {

  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.inner-frame {
  width: 100%; height: 100%;
}

h1 {
  margin: 10px auto;
  /*color: #6b8290;*/
}
h1 {
  font-family: verdana;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #bec7d1;
  margin-top: 0;
  margin-bottom: 22px;
}
.logo {
  max-width: 80px;
  max-height: 80px;
}


</style>
