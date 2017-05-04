<template>
  <!--自定义滚动条-->
  <div class="scroll-bar">
    <span class="scroll"></span>
  </div>

</template>
<script>
  import $scrollBar from '../js/jqueryScrollBar'
  export default {
    mounted () {
        $scrollBar.scrollBar('.scroll', '.scrollTbody')
        $scrollBar.mouseScroll('.scroll', '.scrollTbody')
    }
  }
</script>
<style>
  .scroll-bar{
    position: absolute;
    z-index: 999;
    /*right: 45px;
    top: 32px;*/
    left: 0;
    width: 10px;
    height: 100%;
    background: #bfa;
    border-radius: 5px;
  }
  .scroll{
    position: absolute;
    display: inline-block;
    width: 100%;
    /*height: 50px;*/
    background-color: gray;
    border-radius: 5px;
  }
</style>
