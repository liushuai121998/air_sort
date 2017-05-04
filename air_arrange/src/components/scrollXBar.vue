<template>
    <div class='scrollXBarWrap'>
        <!--横向自定义滚动条-->
        <div class='scroll-x-bar'>
            <span class='scroll-x'></span>
        </div>
    </div>
</template>
<script>
    import $scrollXBar from '../js/jqueryScrollBar'
    export default {
        mounted () {
           $scrollXBar.scrollXBar('.scroll-x', '.scrollX')
        }
    }    
</script>
<style>
    .scroll-x-bar{
    position: absolute;
    z-index: 889;
    /*right: 45px;
    top: 32px;*/
    bottom: 0;
    width: 100%;
    height: 10px;
    background: #bfa;
    border-radius: 5px;
  }
  .scroll-x{
    position: absolute;
    left: 0;
    top: 0;
    width: 50px !important;
    height: 10px;
    background-color: gray;
    border-radius: 5px;
  }
</style>