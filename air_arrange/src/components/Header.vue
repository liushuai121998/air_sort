<template>
    <div class="header">
      <!--v-model 双向数据绑定-->
      <input type="text" class="search" @keydown.enter='search' :placeholder="placeHolderValue" v-model='inputValue' @input='textChange' id='search'><label for='search' class='search_label' @click='search'><span class='icon-search'></span></label>
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
      <span class='show_time'>标准时间: {{time | formatDate}}</span>
      <div class='control_wrap'>
        <span class="icon-minus"></span>
        <span class="icon-checkbox-unchecked"></span>
        <span class="icon-cross"></span>
      </div>
    </div>
</template>
<script>

// let data = require('../../data.json')
import {formatDate} from '../utils/time_format'
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
          logFlag: false,
          time: Date.now()
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
          this.$store.commit('ADD_DATA')
          this.$store.commit('ADD_FIX_DATA')
          this.$store.commit('FLY_CONTROL_SORT', this)
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
          this.$store.commit('UPDATE_TD',{inputValue: this.inputValue, vm: this})
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
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, ' hh:mm yyyy-MM-dd');
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
    background-color: #4e4e4e;
    line-height: 30px;
    margin-left: 60px;
  }
  .search{
    margin-left: 30px;
    border: 1px solid #4e4e4e;
    height: 20px;
    box-sizing: border-box;
    border-right: none;
  }
  .search_label {
    display: inline-block;
    width: 25px;
    height: 20px;
    border: 1px solid #4e4e4e;
    border-left: none;
    background: #02bdf2;
    vertical-align: middle;
    text-align: center;
    line-height: 20px;
    box-sizing: border-box;
    color: #fff;
    font-size: 12px;
  }

  .showInfo {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 20px;
    /*background: #bfa;*/
    background: #fff;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    border-radius: 5px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .showInfo .inputWrap {
    position: absolute;
    left: 100%;
    z-index: 1000;
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
  select {
    vertical-align: middle;
    /*-moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;*/
    outline: none;
    height: 20px;
    border: 1px solid #4e4e4e;
    box-sizing: border-box;
    width: 120px;
    border-radius: 4px;
    margin-left: 10px;
  }
  input[type='button'] {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 4px;
    border: 1px solid #4e4e4e;
    vertical-align: middle;
    background: #fff;
    margin-left: 10px;
  }
  .show_time {
    float: right;
    vertical-align: middle;
    color: #fff;
    font-weight: bold;
    margin-right: 15%;
  }

  .control_wrap {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 20px;
  }
  .control_wrap span {
    margin-right: 10px;
    color: #fff;
    font-size: 12px;
  }
</style>
