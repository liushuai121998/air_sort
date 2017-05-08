<template>
  <div class='wrap'>
    <div class='contentWrap'>
        <div class='theadWrap scrollX'>
            <table>
              <thead>
                <tr>
                  <th v-for='(item,index) in thLeftData' :width= 'item.width' @click='sortTable($event,index)' @mousemove='moveTd($event)'>
                    <div>{{item.title}}</div>
                  </th>
                </tr>
              </thead>  
            </table>
        </div> 
        <div class='scrollTbody scrollX'>
          <table>  
              <tbody>
                <tr v-for='(tdItem, index) in tdData' :class="{active: tdItem['task'] === '补班', delay: tdItem['flightState'] === '到达/延误', preFlight: tdItem['flightState'] === '前起/无'}" @click='selectTr($event,index)'>
                  <td :style='{width: "44px"}'>{{index + 1}}</td>
                  <td v-for='(str, key) in tdItem' :style='{width: backData[key]}' :class='{uniqueClass: key === "flightState"}' v-html='filterStr(str,index,key)'></td>
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
                <tr v-for='(item, index) in fixData'>
                  <td v-for='(str, key) in item' :style='{width: fixTdWidth[key]}' :class='{fixDataBac: randomIndexArr.indexOf(index) > 0, noFixDataBac: str===strRandomArr[Math.round(Math.random()*2)]}'>{{str}}</td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
    <scroll-bar></scroll-bar>
    <scroll-x-bar></scroll-x-bar>
  </div>
  
</template>
<script>
  import scrollBar from './scrollBar'
  import scrollXBar from './scrollXBar'
  import $scrollBar from '../js/jqueryScrollBar'
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
        fixTdWidth: {
          "enterStart": "54px",
          "enterFinish": "54px",
          "enterRemove1": "58px",
          "enterRemove2": "55px",
          "makeFinish1": "53px",
          "makeFinish2": "55px"
        },
        localArr: [],
        // fixData随机显示颜色的索引
        randomIndexArr: [],
        strRandomArr: [],
        // 选中tr的indexArr
        selectIndexArr: [],
        // 选中的tr
        selectTrArr: []

      }
    },
    created () {
      // this.$http.get('/api/data')
      //   .then(res => {
      //     // 请求的数据
      //     this.tdData = res.data.data
      //   })
      
      this.tdData = this.$store.state.data.contentData

      // this.$http.get('/api/fix')
      //   .then(res => {
      //     this.fixData = res.data.data
      //   })
      this.fixData = this.$store.state.data.fixData

        // fixData中的tr随机
      this.randomIndexArr = this.$store.state.arr 
      // console.info(this.randomIndexArr.indexOf(44))  
      // fixData中的tr中的td随机
      this.strRandomArr = this.$store.state.strRandomArr 

    },
    mounted () {
      // this.setInter()
      this.$store.dispatch('RANDOM_DATA')
      
    },
    methods: {
      // 检索高亮 
      filterStr(str,index,key){
        if(key === 'airPos'){
          // 搜索机位 
           return this.$store.state.data.contentData[index].airPos.search(this.$store.state.inputValue) === 0 ? 
       "<span style='background: yellow; color: black; font-size: 18px'>" + this.$store.state.inputValue + "</span>" 
       + this.$store.state.data.contentData[index].airPos.substr(this.$store.state.inputValue.length) : this.$store.state.data.contentData[index][key]
        }else{
          return this.$store.state.data.contentData[index][key]
        }
      
      },
      setInter () {
        this.timeId1 = setInterval(() => {
          this.$http.get('/api/data')
          .then(res => {
            this.tdData = res.data.data
            //this.tdData = this.$store.state.data
            // 随机数
            let random = Math.round(Math.random() * 150)
            let randomArr = ['flightState', 'task']
            let randomStr = randomArr[Math.round(Math.random())]
            // let randomFlight = ['到达/延误', '到达/无', '前起/无']
            let randomObj = {
              'flightState': '到达/延误',
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
                  // 存储的数据大于10条, 清除定时器
                  if(local.length > 10){
                  clearInterval(this.timeId1)
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
      },
      /*选中的tr*/
      selectTr (ev,index) {

        ev = ev || event
        console.log(ev.target)
        // console.log (ev,index)
        console.log(this.$store.state.isClickDel, 'this.$store.state.isClickDel')
        if(this.$store.state.isClickDel) {
          // 删除之后将this.selectIndexArr, this.selectTrArr 置为空数组
          this.selectIndexArr = []
          this.selectTrArr = []
          this.$store.commit('CHANGE_CLICK_STATE')
        }

        // classList属性 toggle()切换(添加返回true 删除返回false) add()添加 remove()删除
         if(ev.target.parentNode.classList.toggle ('selectTr')){
            this.selectIndexArr.push(index)
            this.selectTrArr.push(ev.target.parentNode)
         }else{
            // this.selectIndexArr.indexOf(index) >= 0 && this.selectIndexArr.splice(this.selectIndexArr.indexOf(index),1)
            // this.selectTrArr.indexOf(ev.target.parentNode) >= 0 && this.selectTrArr.splice(this.selectTrArr.indexOf(ev.target.parentNode),1)
            this.selectIndexArr.splice(this.selectIndexArr.indexOf(index),1)
            this.selectTrArr.splice(this.selectTrArr.indexOf(ev.target.parentNode),1)

         }
         console.log(this.selectIndexArr, 'this.selectIndexArr')
         //传过去
         this.$store.commit('SELECT_TR_INDEX',{index: this.selectIndexArr, arr: this.selectTrArr})
         

      },

      moveToDes(arr) {
          $scrollBar.moveToDestation('.scroll', '.scrollTbody', arr[0])
        },
      // 表格排序
      sortTable (ev,index) {
        this.$store.commit('SORT_TABLE',Object.keys(this.$store.state.data.contentData[0])[index-1])

        // 解决v-for强制刷新列表 this.$forceUpdate()
        console.log(this.$store.state.data.contentData)
        //this.$forceUpdate()
      },
      moveTd (ev) {
        // 移动到边框才显示col-resize 
        console.log(String(ev.target).search('Table') >= 0)
        if(String(ev.target).search('Table') >= 0) {
          // console.log(ev.target)
          ev.target.style.cursor = 'col-resize'
          $scrollBar.moveTd(ev.target)
        }else {
          ev.target.parentNode.style.cursor = 'pointer'
        }
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
    components: {'scroll-bar': scrollBar, 'scroll-x-bar': scrollXBar}
  }
</script>
<style>
  .wrap{
    margin-left: 80px;
  }
  .contentWrap {
    width: 1376px;
    overflow: hidden;
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
  table{
    /*border: 'none'*/
    /*border-collapse: collapse;*/
  }
  th, td{
    border: 1px solid #5c5c5c;
    /*border-right: 1px solid red*/
  }
  th{
    border-bottom: none
  }
  th{
    height: 34px;
    text-align: center;
    vertical-align: middle;
    background: #e9e9e9;
    cursor: pointer;

  }
  td{
    height: 29px;
    text-align: center;
    vertical-align: middle;
    background: #3b3b3b;
    color: #fff;
    cursor: pointer;
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
  .fixDataBac{
    background: #f5501f;
  }
  .noFixDataBac{
    background: #3b3b3b;
  }
  /*搜索索引*/
  .searchTd td {
    background: #bfa;
  }
  .selectTr td {
    background: pink;
  }
</style>