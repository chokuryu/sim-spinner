<template>
<i :class="typeIconClass"></i>
</template>

<script>
const HASH = {
  'CIRCLE': 'fas fa-circle-notch',
  'TEXT': 'fas fa-font',
  'RECT': 'far fa-square'
}

export default {
  name: 'FactorTypeIcon',
  props: ['factortype'],
  data () {
    return {
      typeIconClass: HASH[this.factortype] || 'fas fa-user'
    };
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
