<template>
    <div class="header">
      <!--v-model 双向数据绑定-->
      <input type="text" class="search" @keydown.enter='search' :placeholder="placeHolderValue" v-model='inputValue' @keyup.enter='textChange' id='search'><label for='search' class='search_label' @click='search'><span class='icon-search'></span></label>
      <select @change='selectValue($event)'>
        <option>请选择搜索类型(模糊搜索)</option>
        <option selected>按机型搜索</option>
        <option>按时间搜索</option>
        <option>按航班号搜索</option>
        <option>按航线搜索</option>
        <option>按航班状态搜索</option>
        <option>按机号搜索</option>
      </select>
      <!--操作数据-->
      <input type="button" value="新增" @click='addData'>
      <!--<input type="button" value="修改">-->
      <!--<input type="button" value="删除">-->
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
      <input type='text' class='show_info' :value='flightUpdateInfo && flightUpdateInfo[flightUpdateInfo.length - 1]'>
      <!--<div class='control_wrap'>
        <span class="icon-minus"></span>
        <span class="icon-checkbox-unchecked"></span>
        <span class="icon-cross"></span>
      </div>-->
    </div>
</template>
<script>

// let data = require('../../data.json')
import {formatDate} from '../utils/time_format'
import $scrollBar from '../js/jqueryScrollBar.js'
export default {
    props: ['tdData'],
    data () {
        return {
          inputValue: '',
          tdFlightData: [],
          isFlightClick: false,
          isInputChange: true,
          showFirstIndex: 0,
          placeHolderValue: '按机型搜索',
          toggle: false,
          showData: [{value: 'eq', text: '全部显示', isChecked: false}],
          logFlag: false,
          time: 0,
          /*服务数据的显示*/
          serviceDataInfo: [{text: '全部显示', isServiceChecked: false}],
          isServiceShow: false,
          timeId: '',
          isTime: false,
          // 航班变化的信息
          flightUpdateInfo: this.$store.state.flightUpdateInfo,
          cloneData: []
        }
    },
    created () {
      this.getTime()
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

      this.changeTime()
    },
    methods: {
        changeTime () {
          // 获取时间的数据
            let count = 0
            this.timeId = setInterval(() => {
              if(this.$store.state.isGetParamTime) {
                // 保存时间
                this.$store.commit('UPDATE_TIME', {vm: this, time: this.time})
                this.$store.commit('IS_GET_PARAM_TIME', {vm: this, isGet: false})
              }

              this.time += 1000
              count++
              // 十分钟发送一次请求，清楚定时器
              if(count === 600) {
                this.isTime = true
                this.getTime()
                clearInterval(this.timeId)
              }
            }, 1000)

        },
        getTime() {
          this.$http.get('http://192.168.7.53:8080/getTime').then((res) => {
            this.time = res.data
            if(this.isTime) {
              this.changeTime()
              this.isTime = false
            }
          })
        },

        addData (ev) {
          // 新增数据
          this.$store.commit('ADD_DATA', this)
          // this.$store.commit('FLY_CONTROL_SORT', this)

        },
        search (ev) {

          if(this.placeHolderValue.indexOf('时间') < 0) {
            return
          }
          // 时间段的搜索
          ev.target.value = ''
          this.$store.commit('SEARCH', {vm: this, inputValue: this.inputValue, placeHolderValue: this.placeHolderValue})

        },

        // 搜索框输入检索相关的列表
        textChange (ev) {
          console.time('hello')
          this.$store.commit('UPDATE_TD',{inputValue: this.inputValue, vm: this, placeHolderValue: this.placeHolderValue})
//          this.$nextTick(() => {
//              console.timeEnd('hello')
//          })
//          if (this.placeHolderValue.search('时间') > 0) {
//            return
//          }

          if (!this.$store.state.isDiviScreen) {

            //console.log(this.cloneData)
            //this.dataChange(this.cloneData, this.tdData, false)
          } else {
//            dataChange(state.cloneComeData, state.comeData, true)
//            dataChange(state.cloneLeaveData, state.leaveData, true)
          }
          let _this = this

          console.time('id')


        },
        dataChange(cloneData, data, isDivi) {
            //debugger
            // 重置数据
            console.time('id')

            cloneData.forEach((item, index) => {
              this.$set(data, index, item)
            })

            let arrIndex = []
            let param = ''
            this.inputValue = this.inputValue.toUpperCase()

            data.forEach((item, index) => {
              if (this.placeHolderValue.search('机型') > 0) {
                param = 'airType'
                if (item[param] && item[param].indexOf(this.inputValue) >= 0) {
                  arrIndex.push(item)
                }


              } else if (this.placeHolderValue.search('航班') > 0) {

                param = 'flightNo'
                if (item[param] && item[param].search(this.inputValue) >= 0) {
                  arrIndex.push(item)
                }
              } else if (this.placeHolderValue.search('状态') > 0) {
                param = 'status'
                if (item[param] && item[param].search(this.inputValue) >= 0) {
                  arrIndex.push(item)
                }
              } else if (this.placeHolderValue.search('航线') > 0) {
                param = 'line'
                if (item[param] && item[param].search(this.inputValue) >= 0) {
                  arrIndex.push(item)
                }
              } else if (this.placeHolderValue.search('机号') > 0) {
                param = 'regNo'
                if (item[param] && item[param].search(this.inputValue) >= 0) {
                  arrIndex.push(item)
                }
              }

            })
            //data = JSON.parse(JSON.stringify(arrIndex))
            if(arrIndex.length === data.length) {
              return;
            }
            console.time('bbb')
            data.splice(arrIndex.length)
            data.forEach((item, index, arr) => {
              this.$set(arr, index, arrIndex[index])
            })

            // 判断是否分屏, 更新数量
          //            if (isDivi) {
          //              vm.$set(state.length, "comeLength", state.comeData.length)
          //              vm.$set(state.length, 'leaveLength', state.leaveData.length)
          //            } else {
          //              vm.$set(state.length, 'mergeLength', state.initData.length)
          //            }

          },
        selectValue (ev) {
          this.placeHolderValue = ev.target.value
          this.inputValue = ''
          // 将检索后的数据重置， 当select的值发生变化时
          this.$store.commit('RESET_DATA_SEARCH', {vm: this})
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
//            if(this.$store.state.isDiviScreen) {
//              $scrollBar(document.querySelector('.divi_content1'), '.move_wrap', '.tab')
//              $scrollBar(document.querySelector('.divi_content2'), '.move_wrap', '.tab')
//            }else {
//              $scrollBar(document.querySelector('.merge_wrap', '.move_wrap', '.tab'))
//            }
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
        /*服务信息的显示*/
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
//            if(this.$store.state.isDiviScreen) {
//
//              $scrollBar(document.querySelector('.divi_content1'), '.move_wrap', '.tab')
//              $scrollBar(document.querySelector('.divi_content2'), '.move_wrap', '.tab')
//
//            }else {
//
//              $scrollBar(document.querySelector('.merge_wrap', '.move_wrap', '.tab'))
//
//            }
          }
          this.isServiceShow = !this.isServiceShow
        }
    },
    /*时间过滤*/
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, ' hh:mm:ss yyyy-MM-dd');
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
    /*margin-right: 15%;*/
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
  /*显示变化的信息*/
  .show_info {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    border: 1px solid #02BDF2;
    border-radius: 4px;
    width: 300px;
    height: 20px;
  }
</style>
