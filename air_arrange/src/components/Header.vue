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
      <select>
        <option>全部代理</option>
        <option>中国国航航空公司</option>
        <option>中国东方航空公司</option>
        <option>未知</option>
        <option>杭州萧山</option>
        <option>中宇</option>
      </select>
      <section class='showInfo'>
        <span @click='toggleShow(toggle = !toggle)'>显示状态</span>
        <ul class='inputWrap' v-show='toggle'>
          <li>
            <input type='button' value='确定' @click='confirmShow(true)'>
            <input type='button' value='取消' @click='confirmShow(false)'>
          </li></br>
          <li v-for='(item, index) in showData'>
            <input type='checkbox' :id='index' :value='item.value' @click='show($event, item.value, index)' v-model='item.isChecked'>
            <label :for='index' v-text='item.text'></label>
          </li>
        </ul>
      </section>
      <input type='button' value='航控排序' @click='flyControlSort'>
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
          placeHolderValue: '按机位搜索',
          toggle: false,
          showData: [{value: 'eq', text: '全部显示', isChecked: false}],
          logFlag: false
        }
    },
    created () {
      let arr = [].concat(this.$store.state.thLeftData)
      arr.splice(0, 1)
      let obj = this.$store.state.data.contentData[0][1]
      let count = 0
      for(let key in obj) {
        if(key != 'spot') {
          this.showData.push({
            value: key,
            text: arr[count]['title'],
            isChecked: false
          })
        }
        count++
      }
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
          this.$store.commit('ADD_DATA')
          this.$store.commit('ADD_FIX_DATA')
          this.$store.commit('FLY_CONTROL_SORT')
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
        },
        toggleShow () {
          //this.toggle = !this.toggle
        },
        show (ev, val, index) {
          if(val === 'eq') {
            // this.showData[index].isChecked
            this.showData.forEach((item, i) => {
              item.isChecked = this.showData[index].isChecked
            })

          }else {
            let arr = [].concat(this.showData)
            arr.splice(0, 1)
            this.showData[0].isChecked = JSON.stringify(arr).search('false') >= 0 ? false : true
          }
          
        },
        confirmShow(isShow) {
          if(this.logFlag) {
            console.log(this.$store.state.cloneData.contentData)
            // let contentData = this.$store.state.cloneData.contentData
            // let thLeftData = this.$store.state.cloneLeftData
            // this.$store.commit('RESET_DATA', {contentData, thLeftData})
            this.$store.dispatch('RESET_DATA')
            this.logFlag = false
          }
          if(isShow) {

            this.$store.commit('SHOW_DATA', this)
            this.logFlag = true
          }else {
            return
          }
          this.toggle = !this.toggle
        },
        flyControlSort () {
          this.$store.commit('FLY_CONTROL_SORT')
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
    margin-left: 60px;
  }
  .search{
    margin-left: 30px;
  }
  .showInfo {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 20px;
    background: #bfa;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  .showInfo .inputWrap {
    position: absolute;
    left: 100%;
    top: 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid blue;
    border-radius: 5px;
    /*height: 150px;
    overflow: auto;*/
    width: 300px;
  }
  .showInfo .inputWrap li {
    float: left;
    /*text-overflow: ellipsis;
    overflow: hidden;*/
    white-space: nowrap;
  }
</style>
