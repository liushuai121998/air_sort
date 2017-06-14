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
      <span class="icon-cog" ref='iconCog'></span>
      <section ref='menuControl'>
        <span @click='toggleChecked()'><input type="checkbox" id='merge' v-model='isChecked'/><label for='merge'>到离港合并</label></span>
        <span @click='flyControlSort'><input type="checkbox" id='flight-sort' v-model='isSorted'/><label for='flight-sort'>航控排序</label></span>
        <span @click='showRightContent'><input type="checkbox" v-model='isShowRight' id='showRight'/><label for='showRight'>显示右侧边栏</label></span>
      </section>
    </div>
  </div>
</template>
<script>
  import $scrollBar from '../js/jqueryScrollBar.js'
  export default {
    data () {

        return {
          style: {
              height: window.innerHeight + 'px',

          },
          isChecked: this.$store.state.isDiviScreen,
          isSorted: false,
          isReverse: false,
          isShowRight: this.$store.state.isShowRight
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
          if(this.isReverse) {
            ev.target.toggleClick = !ev.target.toggleClick
            this.isReverse = false
          }
          if(ev.target.toggleClick) {
            if(ev.target.className === 'icon-cog') {
              this.$refs.menuControl.style.display = 'block'
            }
            ev.target.style.color = 'yellow'
          }else {

            this.$refs.menuControl.style.display = 'none'
            ev.target.style.color = '#fff'

          }

        }
      },
      toggleChecked () {
        this.$refs.menuControl.style.display = 'none'
        this.$refs.iconCog.style.color = '#fff'
        this.isReverse = true
        this.$store.commit('UPDATE_DIVISCREEN', this.isChecked)
      },
      flyControlSort () {
        this.$refs.menuControl.style.display = 'none'
        this.$refs.iconCog.style.color = '#fff'
        this.isReverse = true

        if(this.isSorted) {
          this.$store.commit('NEW_FLY_CONTROL_SORT', this)
        }else {
          this.$store.commit('NO_FLY_CONTROL_SORT', this)
        }
      },
      showRightContent () {
        this.$refs.menuControl.style.display = 'none'
        this.$refs.iconCog.style.color = '#fff'
        this.isReverse = true

        this.$store.commit('SHOW_HIDDEN_RIGHT', this.isShowRight)
        //console.log(this.$store.state.rightContent)

        if(this.isShowRight) {
          this.$store.state.rightContent.style.display = 'flex'
          document.querySelector('.divi_wrap').style.width = '85%';

          if(!this.$store.state.isDiviScreen) {
            document.querySelector('.merge_wrap').style.width = '85%'
            document.querySelector('.contentWrap').style.width = '100%'
          }

        }else {
          if(!this.$store.state.isDiviScreen) {
            document.querySelector('.merge_wrap').style.width = '100%'
            document.querySelector('.contentWrap').style.width = '100%'
          }

          this.$store.state.rightContent.style.display = 'none'
          document.querySelector('.divi_wrap').style.width = '100%';
        }
        [].slice.call(document.querySelector('.divi_wrap').querySelectorAll('.contentWrap')).forEach(item => {
                item.style.width = '100%'
        });
        $scrollBar.resize('.scroll-x', '.scroll', {merge: '.merge_wrap', divi1: '.divi_content1', divi2: '.divi_content2'}, {content: '.contentWrap', right: '.rightWrap'},  this.$store.state.isDiviScreen)
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
    top: -200%;
    z-index: 99999;
    width: 100px;
    font-size: 12px;
    color: black;
    display: none;
    background: #fff;
    border: 1px solid #02BDF2;
  }
  .side .cog section span {
    float: left;
  }

</style>
