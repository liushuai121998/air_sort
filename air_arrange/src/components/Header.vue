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
          isFlightClick: false
        }
    },
    mounted () {

    },
    methods: {
        getInputValue (ev) {
          this.inputValue = ev.target.value
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
          this.moveToDes(this.arr)
          this.$store.commit('SET_DATA', this.arr)
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
            this.$store.commit('DELETE_DATA', this.arr)
            ev.target.parentNode.firstChild.value = ''

          }
          
        },
        // 搜索框输入检索相关的列表
        textChange () {
          this.isFlightClick = true
          this.$store.commit('IS_FLIGHT_CLICK', this.isFlightClick)
          this.highLight()
        },
        /*高亮显示输入框选择的文本*/
        highLight () {
          let $thNodes = $('.contentWrap th')
          let $trNodes = $('.contentWrap .scrollTbody tr')
          let index = 0
          for(let i=0, len=$thNodes.length; i<len; i++) {
            if($thNodes[i].children[0].innerHTML === '机位') {
              index = i
            }
          }
          let isFirst = true
          for(let j=0, lent=$trNodes.length; j<lent; j++) {
            let tdNodes = $trNodes[j].getElementsByTagName('td')
            let str = tdNodes[index].innerHTML
            this.tdFlightData.push(str)
            if(tdNodes[index].children[0]) {
              // 除第一次
              str = tdNodes[index].children[0].innerHTML + tdNodes[index].children[1].innerHTML
            }else {
              str = tdNodes[index].innerHTML  // 第一次进入
            }
            if(str.indexOf(this.inputValue) === 0) {
              //找出匹配的第一个
              // 第一次进入判断
              if(isFirst) {
                isFirst = false
                console.log(j, 'jjjjjj')
                // 移动与排序冲突了??   判断是否点击了机位这个表头
                this.moveToDes([j+1])
              }
              
              let notHighLight = str.substring(this.inputValue.length)

              //$(tdNodes[index].parentNode).show()
              $(tdNodes[index]).html(`<span style='background: yellow; color: black; font-size: 20px'>${this.inputValue}</span><span>${notHighLight}</span>`)

            }else {
              //tdNodes[index].style.background = '#3b3b3b'

              // $(tdNodes[index].parentNode).hide()
              $(tdNodes[index]).html(this.tdFlightData[j])
            }
          }
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
