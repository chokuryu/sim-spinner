<template>
  <modal-frame :shown="shown" closeBtn="false">

    <template slot="header">
      <span>User Profile</span>
    </template>

    <template slot="main">
      <div>
        <span class="my-roundBtn siimple-btn siimple-btn--grey">
          <i class="far fa-user"></i>
        </span>
      </div>
      <div>Guest</div>
      <br/>
      <div>
        <a class="siimple-btn siimple-btn--red" @click="startSignOut">
          <template v-if="isUnderSignOut"><i class="fas fa-spinner fa-spin"></i></template>
          <template v-else><i class="fas fa-sign-out-alt"></i></template>
          <span>&nbsp;Log out</span>
        </a>
      </div>
    </template>

    <template slot="footer">
      <span class="my-modalFooterStandardContent">
        <a class="siimple-btn siimple-btn--grey" @click="close">OK</a>
      </span>
    </template>

  </modal-frame>
</template>

<script>
import Resource from '@/scripts/Resource'
import ModalFrame from './ModalFrame.vue'

export default {
  name: 'ModalUserProfile',
  components: {
    ModalFrame
  },
  props: ['shown'],
  data() {
    return {
      isUnderSignOut: false
    };
  },
  methods: {
    close() {
      this.$emit('done')
    },
    startSignOut() {
      if (this.isUnderSignOut) return
      this.isUnderSignOut = true
      Promise.all([
        Resource.userService.signOut(),
        promiseWaitTime(1500)
      ]).
      then(results => {
        let [ serviceResult ] = results
        if (serviceResult.completeSignOut) {
          this.$router.push({ name: '@=login_entry' })
        } else {
          alert('サインアウトに失敗しました')
        }
      })
    }
  }
}

let promiseWaitTime = function(time) {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {resolve();}, time)
  })
  return promise
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
