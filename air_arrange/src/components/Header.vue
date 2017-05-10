<template>
    <div class="header">
      <!--v-model 双向数据绑定-->
      <input type="text" class="search" @keydown.enter='search' :placeholder="placeHolderValue" v-model='inputValue' @input='textChange'>
      <select @change='selectValue($event)'>
        <option>请选择搜索类型</option>
        <option selected>按机位搜索</option>
        <option>按时间搜索</option>
        <option>按航班搜索</option>
        <option>按航线搜索</option>
        <option>按航班状态搜索</option>
      </select>
      <!--操作数据-->
      <input type="button" value="新增" @click='addData'>
      <input type="button" value="修改" @click='setData'>
      <input type="button" value="删除" @click='deleteData'>
      <span>标准时间</span>
    </div>
</template>
<script>
// let data = require('../../data.json')
// 自定义过滤器 filters
export default {
    data () {
        return {
          inputValue: '',
          searchInfo: {},
          tdFlightData: [],
          isFlightClick: false,
          isInputChange: true,
          showFirstIndex: 0,
          placeHolderValue: '按机位搜索'
        }
    },
    mounted () {
      
    },
    methods: {

        /**
         * 获取输入的数据
        */
        getValue (val) {
          val = val.trim()
          if(!val){
              return
          }
          switch (this.placeHolderValue) {
            case '按机位搜索':
              this.searchInfo.name = 'airPos'
              if(val.indexOf(' ') > 0){
                val = val.split(' ')  
              }else if(val.indexOf(',') > 0){
                val = val.split(',')
              }else if(val.indexOf(', ') > 0) {
                val = val.split(', ')
              }else if(val.indexOf('-') > 0 && val.indexOf(':') < 0){
                val = val.split('-')
                val.push('-')
              }else {
                val = [val]
              }
              this.searchInfo.val = val
              break
            case '按时间搜索':
              this.searchInfo.name = 'calCome'
              if(val.indexOf(':') > 0) {
                  if(val.indexOf('-') > 0) {
                    val = val.split('-')
                    val.push('-')
                  }else {
                    val = [val]
                  }
              }
              
              this.searchInfo.val = val
              break
            case '按航班搜索':
              this.searchInfo.name = 'mainFlightNum'
              this.searchInfo.val = [val]
              break
            case '按航线搜索':
              this.searchInfo.name = 'flightRoute'
              this.searchInfo.val = [val]
              break
            case '按航班状态搜索':
              this.searchInfo.name = 'flightState'
              this.searchInfo.val = [val]
              break  
          }
        },
        addData (ev) {
          // 新增数据
          let length = this.$store.state.cloneData.contentData.length

          let contentStr = this.$store.state.cloneData.contentData[Math.round(Math.random()*length)]
          let fixStr = this.$store.state.cloneData.fixData[Math.round(Math.random()*length)]
          // console.info(fixStr)
          // console.log(str, 'str--------')
          this.$store.commit('ADD_DATA', contentStr)
          this.$store.commit('ADD_FIX_DATA', fixStr)
        },
        setData () {
          // 修改数据
          this.getValue(this.inputValue)
          this.$store.commit('SET_DATA')
          // console.info(ev.target.parentNode.firstChild)
          this.inputValue = ''
        },
        deleteData (ev) {  
          if(confirm('确定要删除这些信息吗？')){
            // 删除数据
            // if(this.arr.length === 0){
            //   console.log(this.arr, 'this.arr___________')
            // }
            this.getValue(this.inputValue)
            // this.moveToDes(this.arr)
            this.$store.commit('CHANGE_CLICK_STATE')
            //this.$store.commit('DELETE_DATA', {j: this.showFirstIndex, text: this.inputValue})
            this.$store.commit('DELETE_DATA', {j: this.showFirstIndex, text: this.inputValue})
            ev.target.parentNode.firstChild.value = ''
          }
          
        },
        search (ev) {

          this.getValue(this.inputValue)
          ev.target.value = ''
          this.$store.commit('SEARCH', this.searchInfo)

        },
        // 搜索框输入检索相关的列表
        textChange (ev) {
          // this.$store.commit('UPDATE_TD',this.inputValue)
        },
        selectValue (ev) {
          
          this.placeHolderValue = ev.target.value
          this.inputValue = ''
          this.searchInfo = {}
          // console.log(ev.target.value)
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
