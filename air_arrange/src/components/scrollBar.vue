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
        $scrollBar.resize('.scroll', '.scrollTbody', '.scroll-x', '.fixed-x-bar', '.wrap')
    }
  }
</script>
<style>
  .scroll-bar{
    position: absolute;
    z-index: 999;
    left: 0;
    top: 34px;
    width: 10px;
    height: calc(100% - 34px);
    background: #2a2a2a;
    border-radius: 5px;
  }
  .scroll{
    position: absolute;
    display: inline-block;
    width: 100%;
    /*height: 50px;*/
    box-sizing: border-box;
    background-color: gray;
    border: 1px solid black;
    border-radius: 5px;
  }
</style>
