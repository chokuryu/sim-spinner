<template>
  <modal-frame :shown="shown" closeBtn="false">

    <template slot="header">
      <i class="fa fa-plus"></i>&nbsp;&nbsp;<span>New Factor</span>
    </template>

    <template slot="main">
      <table class="my-commonFieldTable">
        <tr>
          <td><label class="siimple-label">Type:</label></td>
          <td>
            <select class="siimple-select" v-model="selected">
              <option
                v-for="(item, index) in items" :key="index"
                :value="{ value : item.type }"
              >{{ item.label }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label class="siimple-label">Name:</label></td>
          <td><input type="text" class="siimple-input" v-model="name" value=""/></td>
        </tr>
      </table>
    </template>

    <template slot="footer">
      <span class="my-modalFooterStandardContent">
        <a class="siimple-btn siimple-btn--teal" @click="doneEdit">Add</a>
        <a class="siimple-btn siimple-btn--grey" @click="cancelEdit">Cancel</a>
      </span>
    </template>

  </modal-frame>
</template>

<script>
import Store from '@/scripts/Store'
import ModalFrame from './ModalFrame.vue'
import FactorDefinition from '@/scripts/FactorDefinition'
import FactorFactory from '@/scripts/FactorFactory'

export default {
  name: 'ModalContentAdditionalFactor',
  components: {
    ModalFrame
  },
  props: ['wid', 'shown'],
  data () {
    let items = FactorDefinition.getTypeNames().map((typeName)=>{
      return {
        type: typeName,
        label: typeName
      }
    });
    return {
      selected: {
        value: 'CIRCLE'
      },
      name: FactorDefinition.getDefaultNameHash()['CIRCLE'],
      items
    };
  },
  watch: {
    selected(after, before) {
      console.dir(arguments)
      if (before.value === after.value) return;
      let defaultHash = FactorDefinition.getDefaultNameHash()
      let defaultNames = Object.keys(defaultHash).map(key => defaultHash[key]);
      console.dir(defaultNames)
      if (defaultNames.includes(this.name)) {
        this.name = defaultHash[after.value]
      }
    }
  },
  methods: {
    doneEdit() {
      let type = this.selected.value
      let factor = FactorFactory.createNewFactor(type, this.name)
      Store.addFactor(this.wid, factor)
      this.$emit('done')
    },
    cancelEdit() {
      this.$emit('done')
    }
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
