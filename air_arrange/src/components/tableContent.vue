<template>
  <div class='wrap'>
    <div class='contentWrap'>
        <div class='theadWrap scrollX'>
            <table>
              <thead>
                <tr ref='firstTh'>
                  <th v-for='(item,index) in thLeftData' :style='{width: item.width}' @click='sortTable($event,index)' >
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
      // 每3秒刷新一次,之前的增删改都失效？？？？？？
      // this.setInter()
      
    },
    methods: {
      // WebSockets
      // 模拟数据发生变化

      filterStr(str,index,key){
        if(key === 'airPos'){
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
      /*选中的td*/
      selectTr (ev,index) {

        ev = ev || event
        console.log (ev,index)
    
         if(ev.target.parentNode.classList.toggle ('selectTr')){
            this.selectIndexArr.push(index)
         }else{
            this.selectIndexArr.splice(this.selectIndexArr.indexOf(index),1)  
         }

         
         //传过去
          this.$store.commit('SELECT_TR_INDEX',this.selectIndexArr)
      },

      moveToDes(arr) {
          $scrollBar.moveToDestation('.scroll', '.scrollTbody', arr[0])
        },
      // 表格排序
      sortTable (ev,index) {
        // 在输入框检索sortTable无效？？？？？ 怎么解决
        // if(this.$store.state.isFlightClick) {
        //   // return
        // }
        // ev.target
        
        // console.log(this.$refs.firstTh)
        // let thNodes = this.$refs.firstTh.getElementsByTagName('th')
        // let index = [].slice.call(thNodes).indexOf(ev.target.parentNode)
        // if(index === -1) {
        //   index = 0
        // }

        // let sortArr = []
        // let trNodes = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')

        // for(let i=0, len=trNodes.length; i<len; i++) {
        //   let tdNodes = trNodes[i].getElementsByTagName('td')
        //   // // tdNodes[index].style.background='#bbf'
        //   // let str = tdNodes[index].innerHTML
        //   if(ev.target.innerHTML === '机位') {
        //     // console.log(i, str)
        //     if(tdNodes[index].children[0]) {
        //       // console.log(i, 'i________________________________________')
        //       str = tdNodes[index].children[0].innerHTML + tdNodes[index].children[1].innerHTML
        //       // console.log(str, 'str________________')
        //     }
        //   }
          // console.log(str, 'jiwei_--------------')

        //   if(ev.target.innerHTML === '机号') {
        //     // 去除前面的字母B
        //     console.log('去除前面的字母B')
        //     str = tdNodes[index].innerHTML.substring(1)
        //   }

        //   if(ev.target.innerHTML === '主航班号' || ev.target.innerHTML === '共享航班号') {
        //     str = tdNodes[index].innerHTML[0].charCodeAt()
        //   }

        //   // Number(tdNodes[index].innerHTML) 将字符串转化为数字
        //   sortArr.push({index: i, num: Number(str)})
          
        // }
        
        // let length = sortArr.length

        //lihao 注
        //降序
        // for(let j=0; j<length-1; j++) {
        //   for(let h=j+1; h<length; h++) {
        //     if(sortArr[j]['num']>sortArr[h]['num']){//如果前面的数据比后面的大就交换  
        //         let temp=sortArr[j];  
        //         sortArr[j]=sortArr[h];  
        //         sortArr[h]=temp;  
        //     }  
        //   }
        // }

        


        // 通过sortArr来调整tr在数据中的顺序？？？？？
       // console.log(sortArr)
        
        // console.log(this.tdData[12])
        this.$store.commit('SORT_TABLE',Object.keys(this.$store.state.data.contentData[0])[index-1])

        // 解决v-for强制刷新列表 this.$forceUpdate()
        console.log(this.$store.state.data.contentData)
        //this.$forceUpdate()

          // .then(() => {
          //   trNodes[0].offsetLeft
          //   console.log(document.documentElement.clientHeight)
          //    //location.reload() 
          // })
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
  table, th, td{
    border: 1px solid #5c5c5c;
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