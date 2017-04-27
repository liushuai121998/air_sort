<template>
    <div class="header">
      <input type="text" class="search">
      <!--操作数据-->
      <input type="button" value="新增" @click="addData">
      <input type="button" value="修改" @click="updateData">
      <input type="button" value="删除">
      <span>标准时间</span>
    </div>
</template>
<script>
let data = require('../../data.json')

export default {
    name: 'hello',
    data () {
        return {

        }
    },
    methods: {
        addData () {

        },

        updateData () {
          data[1].airPos = 8888
          console.log(data[0])
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    position: relative;
    z-index: 888;
    height: 30px;
    background-color: gray;
    line-height: 30px;
    margin-left: 80px;
  }
  .search{
    margin-left: 30px;
  }
</style>
