<template>

    <!-- Work Content On Work Page -->
    <div @click="cancelSelectFactorItem()">
      <div class="siimple-grid">
        <div class="siimple-grid-row">

          <!-- Factors Column -->
          <div class="siimple-grid-col siimple-grid-col--6 siimple-grid-col-md--12 siimple-grid-col-sm--12">
            <h3>Factors</h3>
            <section class="my-container">
              <div class="siimple-grid my-bordered">

                <!-- An Iterated Factor -->
                <transition-group tag="div" name="fade">
                  <div
                    v-for="(prop, index) in factorProps"
                    :key ="prop.id"
                    @click.stop="selectFactorItem(prop.id)"
                    class="factorListItem siimple-grid-row"
                    :class="[{ 'my-selectedItem' : isSelected(prop.id) }, { 'grayout' : isGrayout(prop.id) }]"
                  >
                    <!-- Icon -->
                    <div class="siimple-grid-col siimple-grid-col--2 siimple-grid-col-sm--2">
                      <factor-type-icon v-bind:factortype="prop.type"></factor-type-icon>
                    </div>
                    <!-- Name -->
                    <div class="siimple-grid-col siimple-grid-col--7 siimple-grid-col-sm--7 nameColumn" >
                      <span>{{prop.name}}</span>
                    </div>
                    <!-- Button -->
                    <div class="siimple-grid-col siimple-grid-col--3 siimple-grid-col-sm--3">
                      <a class="factorBtn siimple-btn siimple-btn--grey" v-on:click="segueFactorPage(index)">
                        <i class="fas fa-wrench"></i>
                      </a>
                    </div>
                  </div>
                </transition-group>

                <div class="siimple-grid-row factorListItem factorListItem2">
                  <div class="siimple-grid-col siimple-grid-col--12">
                    <a @click="add" class="siimple-btn siimple-btn--teal my-btnWideFit"
                    ><i class="fas fa-plus"></i> Factor</a>
                  </div>
                </div>

              </div>
            </section>
          </div>

          <!-- Output Column -->
          <div class="siimple-grid-col siimple-grid-col--6 siimple-grid-col-md--12 siimple-grid-col-sm--12">
            <h3>Output</h3>
            <section class="my-container">
              <div class="my-bordered">
                <div class="siimple-tabs">
                  <div @click="changeOutput(1)" class="siimple-tabs-tab" :class="{ 'siimple-tabs-tab--selected' : selectedTab === 1 }">CSS</div>
                  <div @click="changeOutput(2)" class="siimple-tabs-tab" :class="{ 'siimple-tabs-tab--selected' : selectedTab === 2 }">HTML</div>
                </div>
                <textarea class="output-area siimple-pre siimple-textarea siimple-textarea--fluid" rows="5"></textarea>
                <!--<div class="siimple-pre output-area"></div>-->
              </div>
            </section>
          </div>

        </div>
      </div>

      <br/>

    </div>

</template>


<script>
import Store from '@/scripts/Store'
import OutputMaker from '@/scripts/OutputMaker'
import FactorTypeIcon from '@/components/FactorTypeIcon.vue'

export default {
  name: 'WorkContent',
  components: {
    FactorTypeIcon
  },
  props: ['wid', 'updationIndex'],
  data () {
    let work = Store.referWork(this.wid)
    let factorDict = Store.referFactorDictOf(this.wid)
    let factorProps = Store.getFactorIdListOf(this.wid).map(fid => factorDict[fid]);
    return {
      factorProps,
      work,
      emphasizedFid: null,
      selectedTab: 1
    }
  },
  updated() {
    //console.log('workContent updated.')
  },
  mounted() {
    document.querySelector('html').scrollTop = 1;
    //
    //this.refleshFactors()
  },
  computed: {

  },
  watch: {
    // To update, updationIndex should be increaded.
    updationIndex() {
      this.refleshFactors()
    }
  },
  methods: {
    refleshFactors() {
      //let idList = Store.getFactorIdListOf(this.wid)
      let factorDict = Store.referFactorDictOf(this.wid)
      this.factorProps = Store.getFactorIdListOf(this.wid).map(fid => factorDict[fid]);
      // this.factorProps = idList.map( (fid) => {
      //   return {
      //     name: factorDict[fid].name,
      //     id: factorDict[fid].id,
      //     type: factorDict[fid].type
      //   };
      // })
      this.writeInOutput(1)
    },
    selectFactorItem(fid) {
      this.emphasizedFid =  (this.emphasizedFid === fid) ? null : fid;
      this.$emit('emphasizeFactor', this.emphasizedFid)
    },
    cancelSelectFactorItem() {
      if (!this.emphasizedFid) return;
      this.selectFactorItem(null)
    },
    isSelected(fid) {
      return (this.emphasizedFid === fid)
    },
    isGrayout(fid) {
      return (this.emphasizedFid !== fid && this.emphasizedFid)
    },
    segueFactorPage(index) {
      let wid = this.wid
      let fid = this.factorProps[index].id
      //this.$router.push({ path: `/work/${wid}/factor/${fid}/` })
      this.$router.replace({ name: '@=work>factor_content', params: { wid, fid } })
    },
    add() {
      this.$emit('requestAddFactor')
    },
    doneAdd() {
       this.refleshFactors()
       this.factorAddModalShown = false
     },
    changeOutput(num) {
      if(num === this.selectedTab) return
      this.selectedTab = num
      this.writeInOutput(num)
    },
    writeInOutput(num) {
      let factorDict = Store.referFactorDictOf(this.wid)
      let factors = this.factorProps.map( (prop) => {
        return factorDict[prop.id];
      });

      let area = document.querySelector('.output-area')
      if(num === 1){
        area.innerHTML = OutputMaker.createStyleText(this.work, factors)
      }else{
        area.innerHTML = OutputMaker.createHtmlText(this.work, factors)
      }
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.drill-enter {
  /*transform: translate(-50px, 0);*/
  /*transform: rotate3d(0, 1, 0, -180deg);*/
}

h3 {
  margin: 16px 0 10px 20px;
  text-align: left;
}
.factorListItem {
  height: 60px;
  line-height: 60px;
  border: 1px solid #eee; border-radius: 8px;
  background-color: #f8f8fb;/*#f8f8f8;*/
  opacity: 1;
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.factorListItem2 {
  border: none;
  background-color: transparent;
  margin-top: 6px;
}
.linked {
  text-decoration-line: underline;
  cursor: pointer;
}
.nameColumn {
  text-align:left;
  user-select: none;
}
.factorBtn {
  width: auto;
}
.output-area {
  width: 100%; height: 200px;
  overflow-y: scroll;
}

.grayout > div {
  opacity: 0.5;
}


</style>
