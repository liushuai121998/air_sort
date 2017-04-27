<template>
  <div class='wrap'>
    <div class='contentWrap'>
        <div class='theadWrap'>
            <table>
              <thead>
                <tr>
                  <th v-for='item in thLeftData' :style='{width: item.width}'>
                    <div>{{item.title}}</div>
                  </th>
                </tr>
              </thead>  
            </table>
        </div> 
        <div class='scrollTbody'>
          <table>
              <tbody>
                <tr v-for='(tdItem, index) in tdData' :class="{active: tdItem['task'] === '补班', delay: tdItem['flightState'] === '到达/延误', preFlight: tdItem['flightState'] === '前起/无'}">
                  <td :style='{width: "44px"}'>{{index + 1}}</td>
                  <td v-for='(str, key) in tdItem' :style='{width: backData[key]}' :class='{uniqueClass: key === "flightState"}'>{{str}}</td>
                </tr>
              </tbody>
          </table>
        </div>
    </div>
    <div class='rightWrap'>
      <div class='theadWrap'>
        <table>
          <thead>
              <tr>
                <th v-for='item in thRightData' :style='{width: item.width}' :colspan='item.col'>
                  <div>{{item.title}}</div>
                </th>
              </tr>
          </thead>
          
        </table>
      </div>
      <div class='scrollTbody'>
        <table>
          <tbody>
                <tr v-for='item in fixData'>
                  <td v-for='(str, key) in item' :style='{width: fixTdWidth[key]}'>{{str}}</td>
                </tr>
          </tbody>
        </table>
      </div>
      <scroll-bar></scroll-bar>
    </div>
  </div>
</template>
<script>
  import scrollBar from './scrollBar'
  export default {
    data () { 
      return {
        thLeftData: [{title: '', width: '44px'}, {title: '月/日', width: '69px'}, {title: '标记', width: '42px'}, {title: '主航班号', width: '85px'},
              {title: '共享航班号', width: '151px'}, {title: '机号', width: '65px'}, {title: '类型', width: '69px'}, {title: '机型', width: '75px'}, {title: '任务', width: '70px'},
              {title: '航班状态', width: '131px'}, {title: '航线', width: '99px'}, {title: '机位', width: '64px'}, {title: '登机口', width: '69px'}, {title: '计到', width: '54px'},
              {title: '计离', width: '54px'}, {title: '预离', width: '54px'}, {title: '实离', width: '54px'}, {title: '预位', width: '54px'}, {title: '跑道', width: '53px'}],
        thRightData: [
          {title: '进港桥载开始', width: '54px', col: 0}, {title: '进港撤桥结束', width: '54px', col: 0}, {title: '进港撤桥载', width: '114px', col: 2}, {title: '上轮档(结束)', width: '109px', col: 2}
        ],
        tdData: null,
        fixData: null,
        temp: null,
        fixTemp: null,
        // fixTdArr: []  
        fixTdWidth: {
          "enterStart": "54px",
          "enterFinish": "54px",
          "enterRemove1": "58px",
          "enterRemove2": "55px",
          "makeFinish1": "53px",
          "makeFinish2": "55px"
        },
        localArr: []  
      }
    },
    created () {
      this.$http.get('/api/data')
        .then(res => {
          // 请求的数据
          this.tdData = res.data.data
          // 第一个数据同时发生了变化, 可以通过这个来模拟数据的变化
          // this.temp = this.tdData[0]
          // let count = 0
          // for(var n in this.temp){
          //   count++
          //   let temp = this.thLeftData[count]
          //   this.temp[n] = temp.width
          // }
          // console.log(this.tdData)
        })
      this.$http.get('/api/fix')
        .then(res => {
          this.fixData = res.data.data
          })  
    },
    mounted () {
      this.setInter()
    },
    methods: {
      // 模拟数据发生变化
      setInter () {
        this.timeId1 = setInterval(() => {
          this.$http.get('/api/data')
          .then(res => {
            this.tdData = res.data.data
            // 随机数
            let random = Math.round(Math.random()*150)
            let randomArr = ['flightState', 'task']
            let randomStr = randomArr[Math.round(Math.random())]
            let randomFlight = ['到达/延误', '到达/无', '前起/无']
            let randomObj = {
              'flightState': randomFlight[Math.round(Math.random()*2)],
              'task': '补班'
            }
            /// 模拟动态数据的变化(结合离线存储技术localStorage)
            for(var n in this.tdData[random]){
              if(n === randomStr){
                let local = JSON.parse(localStorage.getItem('addItem'))
                if(local){
                  for(var i=0, len=local.length; i<len; i++){
                    this.tdData[(local[i].random)][(local[i].n)] = randomObj[(local[i].randomStr)]
                  }
                }
                this.tdData[random][n] = randomObj[randomStr]
                let obj = {random, n, randomStr}
                this.localArr.push(obj)
                localStorage.setItem('addItem', JSON.stringify(this.localArr))
                
              }
            }
          })
        }, 5000)
      }
    },
    computed: {
      backData () {
          this.temp = {
            "date": "12/21",
            "spot": "-",
            "mainFlightNum": "MU5444",
            "shareFlightNum": "MU3464/5435",
            "airplaneNum": "B6971",
            "type": "国内",
            "airType": "333",
            "task": "正班",
            "flightState": "到达/无",
            "flightRoute": "沪-蓉-沪",
            "airPos": "135",
            "boardingGate": "135",
            "calCome": "2100",
            "calLeave": "2100",
            "preLeave": "2100",
            "relLeave": "-",
            "prePos": "-",
            "race": "02R/"
        }
          let count = 0
          for(var n in this.temp){
            count++
            let temp = this.thLeftData[count]
            this.temp[n] = temp.width
          }
          // console.log(this.tdData)
          return this.temp
      }
    },
    components: {'scroll-bar': scrollBar}
  }
</script>
<style>
  .wrap{
    margin-left: 80px;
  }
  .contentWrap, .rightWrap{
    float: left;
  }
  .theadWrap{
    position: relative;
    z-index: 99;
  }
  .scrollTbody{
    position: relative;
    z-index: 9;
    left: 0;
    top: 0;
  }
  table, th, td{
    border: 1px solid #5c5c5c;
  }
  th{
    height: 34px;
    text-align: center;
    vertical-align: middle;
    background: #e9e9e9;
  }
  td{
    height: 29px;
    text-align: center;
    vertical-align: middle;
    background: #3b3b3b;
    color: #fff;
  }
  .delay td{
    background-color: red;
  }
  .active td{
    background-color: orange;
  }
  .uniqueClass{
    background-color: #fff8c6;
    color: black;
  }
  .preFlight td{
    background-color: #b8ff3f;
    color: black;
  }
</style>