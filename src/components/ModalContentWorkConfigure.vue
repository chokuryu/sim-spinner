<template>
  <modal-frame :shown="shown" closeBtn="false">

    <template slot="header">
      <i class="fa fa-cog"></i>&nbsp;&nbsp;<span>Project Setting</span>
    </template>

    <template slot="main">
      <table class="my-commonFieldTable">
        <tr>
          <td><label class="siimple-label">Name:</label></td>
          <td><input type="text" class="siimple-input" v-model="name" value=""/></td>
        </tr>
        <tr>
          <td><label class="siimple-label">ID:</label></td>
          <td><input type="text" class="siimple-input dis" v-model="id" value="" readonly/></td>
        </tr>
        <tr>
          <td><label class="siimple-label">Dark:</label></td>
          <td>
            <div class="siimple-checkbox">
              <input type="checkbox" id="myCheckbox" v-model="isDark">
              <label for="myCheckbox"></label>
            </div>
          </td>
        </tr>
      </table>

      <table class="my-commonFieldTable my-backColor1" style="height:auto; padding:20px 0;">
        <tr>
          <td><label class="siimple-label">Delete PJ:</label></td>
          <td>
            <div class="siimple-switch">
              <input type="checkbox" id="mySwitch" v-model="shouldDelete">
              <label for="mySwitch"></label>
              <div></div>
            </div>
          </td>
        </tr>
      </table>
    </template>

    <template slot="footer">
      <span class="my-modalFooterStandardContent">
        <a class="siimple-btn siimple-btn--aqua" @click="doneEdit">OK</a>
      </span>
    </template>

  </modal-frame>
</template>

<script>
import Store from '@/scripts/Store'
import ModalFrame from './ModalFrame.vue'

export default {
  name: 'ModalContentWorkConfigure',
  components: {
    ModalFrame
  },
  props: ['wid', 'shown'],
  data () {
    let store = Store.referWork(this.wid)
    return {
      name: store.name,
      isDark: store.isDark,
      shouldDelete: false,
      id: this.wid
    }
  },
  watch: {
    shouldDelete(before, after) {
      if (after === true) return
      setTimeout(()=>{
        this.deleteWork()
      }, 200);
    }
  },
  methods: {
    doneEdit() {
      Store.referWork(this.wid).name = this.name
      Store.referWork(this.wid).isDark = this.isDark
      Store.saveWork(this.wid)
      this.$emit('done')
    },
    deleteWork() {
      var res = window.confirm( `Delete? ${this.wid}` );
      if (!res) {
        this.shouldDelete = false
        return;
      }
      Store.deleteWork(this.wid)
      this.$emit('doneDeleteWork')
    }
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.siimple-switch input[type=checkbox]:checked ~ div {
  background: red;
}

</style>
