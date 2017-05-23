<template>
  <div class="side" :style="style" @click='selectIcon($event)' ref='sideWrap'>
    <div class='eye'>
      <span class="icon-eye"></span>
    </div>
    <div class='message'>
      <span class="icon-bubble2"></span>
    </div>
    <div class='compass'>
      <span class="icon-compass"></span>
    </div>
    <div class='pie_chart'>
      <span class="icon-pie-chart"></span>
    </div>
    <div class='add'>
      <span class="icon-plus"></span>
    </div>
    <div class='cog'>
      <span class="icon-cog"></span>
      <section ref='menuControl'>
        <span @click='toggleChecked()'><input type="checkbox" id='merge' v-model='isChecked'/><label for='merge'>到离港合并</label></span>
        <span @click='flyControlSort'><input type="checkbox" id='flight-sort' v-model='isSorted'/><label for='flight-sort'>航控排序</label></span>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
        
        return {
          style: {
              height: window.innerHeight + 'px',
              
          },
          isChecked: this.$store.state.isDiviScreen,
          isSorted: false
        }
    },
    mounted () {
      this.$refs.sideWrap.style.height = document.documentElement.clientHeight + 'px'

      this.$store.commit('UPDATE_DIVISCREEN', this.isChecked)
    },
    methods: {
      selectIcon (ev) {
        if(ev.target.nodeName.toLowerCase() === 'span'){
          // console.log(this.$refs.sideWrap)
          Array.prototype.slice.call(this.$refs.sideWrap.children).forEach((item) => {
            item.firstElementChild.style.color = 'white'
          })
          
          ev.target.toggleClick = !ev.target.toggleClick  
          if(ev.target.toggleClick) {
            if(ev.target.className === 'icon-cog') {
              this.$refs.menuControl.style.display = 'block'
            }
            ev.target.style.color = 'yellow'
          }else {

            this.$refs.menuControl.style.display = 'none'
            ev.target.style.color = 'white'

          }

        }
      },
      toggleChecked () {
        this.$store.commit('UPDATE_DIVISCREEN', this.isChecked)
      },
      flyControlSort () {
        if(this.isSorted) {
          this.$store.commit('FLY_CONTROL_SORT', this) 
        }
      }
    }
  }
</script>
<style>
  .side{
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    background-color: black;
    color: #fff;
  }
  .side div {
    text-align: center;
    font-size: 30px;
    margin-bottom: 50px;
  }
  .side .eye {
    margin-top: 150px;
  }
  .side .cog {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-bottom: 80px;
  }
  .side .cog section {
    position: absolute;
    left: 0;
    top: -150%;
    z-index: 99999;
    width: 100px;
    font-size: 12px;
    color: #fff;
    display: none;
  }
  .side .cog section span {
    float: left;
  }
  
</style>
