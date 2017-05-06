<template>
    <div class="header">
      <!--v-model 双向数据绑定-->
      <input type="text" class="search" @keydown.enter='search' @blur='getInputValue' placeholder="搜索机位" v-model='inputValue' @input='textChange'>
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
import $scrollBar from '../js/jqueryScrollBar'
import $ from 'jquery'
export default {
    data () {
        return {
          inputValue: '',
          arr: [],
          tdFlightData: [],
          isFlightClick: false,
          isInputChange: true,
          showFirstIndex: 0 
        }
    },
    mounted () {

    },
    methods: {
        getInputValue (ev) {
          // 每次变化将state中高亮的tr置空
          // this.$store.commit('HIGH_LIGHT_TR_EMPTY')
          // 失去焦点 
          this.isInputChange = false
          // 失去焦点时再次触发高亮
          // this.highLight()
          // //console.log($(this.$store.state.highLightTr[0]))
          // for(let i=0, len=this.$store.state.highLightTr.length; i<len; i++) {
          //   $(this.$store.state.highLightTr[i]).children().css({
          //     background: '#bfa'
          //   })
          // }
          // ev.target.value = ''
        },
      
        moveToDes(arr) {
          $scrollBar.moveToDestation('.scroll', '.scrollTbody', arr[0])
        },

        /**
         * 获取输入的数据
        */
        getValue (val) {
          //console.log(val.indexOf('0'))
          val = val.trim()
          if(val.indexOf('0') === 0 || !val){
            return
          }
          if(val.indexOf(' ') > 0){
            this.arr = val.split(' ')
          }else if(val.indexOf(',') > 0){
            this.arr = val.split(',')
          }else if(val.indexOf(', ')) {
            this.arr = val.split(', ')
          }else {
            this.arr.push(val)
          }
        },
        search (ev) {
          // 寻找数据
          // console.log(ev.target)
          this.getValue(this.inputValue)
          this.moveToDes(this.arr)
          this.$store.commit('SEARCH', this.arr)
          // console.info(this.$props.data)
          ev.target.value = ''
        },
        addData (ev) {
          // 新增数据
          let contentStr = this.$store.state.data.contentData[0]
          let fixStr = this.$store.state.data.fixData[0]
          // console.info(fixStr)
          // console.log(str, 'str--------')
          this.$store.commit('ADD_DATA', contentStr)
          this.$store.commit('ADD_FIX_DATA', fixStr)
        },
        setData (ev) {
          // 修改数据
          this.getValue(this.inputValue)
          this.$store.commit('SET_DATA', this.inputValue)
          // console.info(ev.target.parentNode.firstChild)
          ev.target.parentNode.firstChild.value = ''
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


            //lihao

            // this.$store.state.data.contentData.shift()

          }
          
        },
        // 搜索框输入检索相关的列表
        textChange () {
          this.isInputChange = true
          this.isFlightClick = true
          this.$store.commit('IS_FLIGHT_CLICK', this.isFlightClick)
          this.$store.commit('UPDATE_TD',this.inputValue)
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
