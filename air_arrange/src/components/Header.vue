<template>
    <div class="header">
      <!--v-model 双向数据绑定-->
      <input type="text" class="search" @keydown.enter='search' :placeholder="placeHolderValue" v-model='inputValue' @keyup='textChange' id='search'><label for='search' class='search_label' @click='search'><span class='icon-search'></span></label>
      <select @change='selectValue($event)'>
        <option>请选择搜索类型(模糊搜索)</option>
        <option selected>按机型搜索</option>
        <option>按时间搜索</option>
        <option>按航班搜索</option>
        <option>按航线搜索</option>
        <option>按航班状态搜索</option>
        <option>按机号搜索</option>
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
      <section class='serviceInfo'>
        <span @click='serviceToggle(isServiceShow = !isServiceShow)'>服务显示状态</span>
        <ul class='service_show' v-show='isServiceShow'>
          <li>
            <input type='button' value='确定' @click='confirmServiceShow(true)'>
            <input type='button' value='取消' @click='confirmServiceShow(false)'>
          </li></br>
          <li v-for='(item, index) in serviceDataInfo'>
            <input type='checkbox' :id='index' v-model='item.isServiceChecked' @click='showService($event, item, index)'>
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
import $scrollBar from '../js/jqueryScrollBar.js'
export default {
    data () {
        return {
          inputValue: '',
          searchInfo: {},
          tdFlightData: [],
          isFlightClick: false,
          isInputChange: true,
          showFirstIndex: 0,
          placeHolderValue: '按机型搜索',
          toggle: false,
          showData: [{value: 'eq', text: '全部显示', isChecked: false}],
          logFlag: false,
          time: Date.now(),
          /*服务数据的显示*/
          serviceDataInfo: [{text: '全部显示', isServiceChecked: false}],
          isServiceShow: false
        }
    },
    created () {
    },
    mounted () {
      // 定时器，数据加载回来
      setTimeout(() => {
        let arr = [].concat(this.$store.state.thLeftData)
        arr.splice(0, 1)
        let obj = this.$store.state.initData[0]
        arr.forEach((item, index) => {
          this.showData.push({
            value: item['name'],
            text: item['title'],
            isChecked: false
          })
        })

        let serviceArr = [].concat(this.$store.state.serviceData[0])
        serviceArr.forEach((item, index) => {
          this.serviceDataInfo.push({
            text: item['detailName'], 
            isServiceChecked: false
          })
        })
        
      }, 1000)

    },
    methods: {

        addData (ev) {
          // 新增数据
          this.$store.commit('ADD_DATA', this)
          // this.$store.commit('FLY_CONTROL_SORT', this)

        },
        setData () {
          // 修改数据
          this.$store.commit('SET_DATA')
          // console.info(ev.target.parentNode.firstChild)
          this.inputValue = ''
        },
        deleteData (ev) {  
          if(confirm('确定要删除这些信息吗？')){
            // 删除数据 
            // this.$store.commit('CHANGE_CLICK_STATE')
            this.$store.commit('DELETE_DATA', this)
          }
          
        },
        search (ev) {
          ev.target.value = ''
          this.$store.commit('SEARCH', this.searchInfo)

        },
        
        // 搜索框输入检索相关的列表
        textChange (ev) {
          if(!this.$store.state.isDiviScreen){
            $scrollBar.scrollBar('.scroll', '.scrollTbody', {mergeWrap: document.querySelector('.merge_wrap'), diviContent1: null, diviContent2: null})

          } else {

            $scrollBar.scrollBar('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: document.querySelector('.divi_content1'), diviContent2: document.querySelector('.divi_content2')})

          }
          this.$store.commit('UPDATE_TD',{inputValue: this.inputValue, vm: this, placeHolderValue: this.placeHolderValue})

        },
        selectValue (ev) { 
          this.placeHolderValue = ev.target.value
          this.inputValue = ''
          this.searchInfo = {}

        },
        toggleShow () {
          //this.toggle = !this.toggle
          if(this.toggle) {
            this.isServiceShow = false
          }
        },
        show (ev, val, index) {
          if(val === 'eq') {
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
            // console.log(this.$store.state.cloneData.contentData)
            //this.logFlag = false
          }
          if(isShow) {
            this.$store.commit('SHOW_DATA', {vm: this, showData: this.showData})
            //this.logFlag = true
          }else {
            this.toggle = !this.toggle
            return
          }
          this.toggle = !this.toggle
        },
        /*服务信息的显示

          */
        serviceToggle () {
          if(this.isServiceShow) {
            this.toggle = false
          }
        },
        showService (ev, item, index) {
          if(item.text === '全部显示') {
            this.serviceDataInfo.forEach((item, i) => {
              item.isServiceChecked = this.serviceDataInfo[index].isServiceChecked
            })

          }else {
            let arr = [].concat(this.serviceDataInfo)
            arr.splice(0, 1)
            this.serviceDataInfo[0].isServiceChecked = JSON.stringify(arr).search('false') >= 0 ? false : true
          }
        },
        confirmServiceShow (isConfirm) {

          if(isConfirm) {
            
            this.$store.commit('SHOW_SERVICE_DATA', {serviceDataInfo: this.serviceDataInfo, vm: this})
          }

          this.isServiceShow = !this.isServiceShow
        }
    },   
    /*时间过滤*/
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
    border: 1px solid #02BDF2;
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

  /*服务信息
  */
  .serviceInfo {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    background: #fff;
    height: 20px;
    line-height: 20px;
    border-radius: 5px;
    padding: 0 15px;
    margin-left: 10px;
    cursor: pointer;
  }
  .serviceInfo .service_show {
    position: absolute;
    right: -100%;
    top: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #02BDF2;
    border-radius: 5px;
  }
  .service_show li {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
