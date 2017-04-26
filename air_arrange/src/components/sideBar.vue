<template>
  <div class="side" :style="style">

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

</style>
