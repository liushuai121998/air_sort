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
    }
  }
</script>
<style>
  .scroll-bar{
    position: absolute;
    right: 45px;
    top: 32px;
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
