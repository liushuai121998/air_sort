<template>
    <div class='scrollXBarWrap'>
        <!--横向自定义滚动条-->
        <div class='scroll-x-bar'>
            <span class='scroll-x'>
            </span>
            <!--<div class='fixed-x-bar' ref='fixedBar'></div>-->
        </div>
        
    </div>
</template>
<script>
    import $scrollXBar from '../js/jqueryScrollBar'
    export default {
        mounted () {
            
        }
    }    
</script>
<style>
    .scroll-x-bar{
    position: absolute;
    z-index: 889;
    bottom: 0;
    width: 100%;
    height: 10px;
    background: #2a2a2a;
    border-radius: 5px 0 0 5px;
  }
  .scroll-x{
    position: absolute;
    left: 0;
    top: 0;
    /*width: 50px;*/
    height: 10px;
    box-sizing: border-box;
    border: 1px solid black;
    background-color: gray;
    border-radius: 5px;
  }
  .fixed-x-bar{
    position: absolute;
    z-index: 1001;
    top: 0;
    right: -100px;
    /*width: 100%;*/
    width: 100px;
    height: 10px;
    background: #2a2a2a;
    border-radius: 0px 5px 5px 0;
  }
  
</style>