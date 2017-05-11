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
    </div>
  </div>
</template>
<script>
  export default {
    data () {
        console.log(window.innerHeight)
        return {
          style: {
              height: window.innerHeight + 'px',
          }
        }
    },
    methods: {
      selectIcon (ev) {
        if(ev.target.nodeName.toLowerCase() === 'span'){
          console.log(this.$refs.sideWrap)
          Array.prototype.slice.call(this.$refs.sideWrap.children).forEach((item) => {
            item.firstElementChild.style.color = 'white'
          })
          ev.target.toggleClick = !ev.target.toggleClick  
          if(ev.target.toggleClick) {
            ev.target.style.color = 'yellow'
          }else {
            ev.target.style.color = 'white'
          }

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
    width: 80px;
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
</style>
