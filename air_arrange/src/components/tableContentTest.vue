<template>
  <div class='wrap'>
    <div class='contentWrap'>
        <div class='main_content'>
          <div class='theadWrap  scrollX' ref='theadWrap'>
           <ul id='tab'><!--
                --><li v-for='(item,index) in thLeftData' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index)'><span>{{item.title}}</span><div class='ww'></div></li>
           </ul>
          </div> 
          <div class='tbodyWrap scrollX scrollTbody' ref='tbodyWrap'>
            <ul v-for='(tdItem, index) in tdData' :class="{active: tdItem[1]['task'] === '补班', delay: tdItem[1]['flightState'] === '到达/延误', preFlight: tdItem[1]['flightState'] === '前起/无', firstClass: tdItem[0]['id'] === 1, secondClass: tdItem[0]['id'] === 2, thirdClass: tdItem[0]['id'] === 3, forthClass: tdItem[0]['id'] === 4, fifthClass: tdItem[0]['id'] === 5, sixClass: tdItem[0]['id'] === 6, sevenClass: tdItem[0]['id'] === 7, eightClass: tdItem[0]['id'] === 8}"  @click='selectTr($event,index)' :key='index'>
                  <li :style='{width: thLeftData[0]["width"]}'>{{index + 1}}</li><!--
                  --><li v-for='(str, key, i) in tdItem[1]' :key='i' :style='{width: backData[key]}'  :class='{uniqueClass: key === "flightState"}'>{{str}}</li>
            </ul>
          </div>
        </div>
    </div>
    <div class='rightWrap'>
      <div class='theadWrap'>
        <ul>
          <li v-for='(item, index) in thRightData' :style='{width: item.width}' :key='index'><div>{{item.title}}</div></li>
        </ul>
      </div>
      <div class='tbodyWrap scrollTbody'>
        <ul v-for='(item, index) in fixData' :key='index'>
          <li v-for='(str, key, i) in item' :key='i' :style='{width: fixTdWidth[key]}' :class='{fixDataBac: randomIndexArr.indexOf(index) > 0, noFixDataBac: str===strRandomArr[Math.round(Math.random()*2)]}'>{{str}}</li>
        </ul>
      </div>
      <div class='fixed-x-bar' ref='fixedBar'></div>
    </div>
    <scroll-bar></scroll-bar>
    <scroll-x-bar></scroll-x-bar>
    <right-content></right-content>
  </div>
  
</template>
<script>
  import scrollBar from './scrollBar'
  import scrollXBar from './scrollXBar'
  import rightContent from './rightContent'
  import $scrollBar from '../js/jqueryScrollBar'
  export default {
    data () { 
      return {
        temp: null,
        fixTemp: null,
        fixTdWidth: {
          "enterStart": "15%",
          "enterFinish": "15%",
          "enterRemove1": "17%",
          "enterRemove2": "18%",
          "makeFinish1": "17%",
          "makeFinish2": "18%"
        },
        localArr: [],
        // fixData随机显示颜色的索引
        randomIndexArr: [],
        strRandomArr: [],
        // 选中tr的indexArr
        selectIndexArr: [],
        // 选中的tr
        selectTrArr: [],
        tdData: []
      }
    },
    created () {
      this.randomIndexArr = this.$store.state.arr 
      
      this.strRandomArr = this.$store.state.strRandomArr 

      this.tdData = this.$store.state.data.contentData
      // 排序
      this.$store.commit('FLY_CONTROL_SORT', this)
    },
    mounted () {
      // this.setInter()
      // this.$store.dispatch('RANDOM_DATA')
      $scrollBar.widthScale('tab', this)
      // 航控排序
      //this.tdData = this.$store.state.data.contentData
      setTimeout(() => {
         this.$set(this, 'tdData', this.$store.state.data.contentData)
      }, 5000)
      
    },
    methods: {
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
      // 表格排序
      sortTable (ev,index) {
        this.$store.commit('SORT_TABLE',Object.keys(this.$store.state.data.contentData[0][1])[index-1])
        // 解决v-for强制刷新列表 this.$forceUpdate()
         //this.$forceUpdate()
      },  
    },
    computed: {
      backData () {
          this.temp = JSON.parse(JSON.stringify(this.$store.state.data.contentData[0][1]))
          let count = 0
          for(var n in this.temp){
            count++
            let temp = this.$store.state.thLeftData[count]
            this.temp[n] = temp.width
          }
          return this.temp
      },
      
      fixData () {
        return this.$store.state.data.fixData
      },
      thLeftData () {

        if(this.$store.state.isBai) {
          this.$refs.theadWrap.style.width = '100%'
          this.$refs.tbodyWrap.style.width = '100%'
        }

        return this.$store.state.thLeftData
      },
      thRightData () {
        return this.$store.state.thRightData
      }
    },
    components: {'scroll-bar': scrollBar, 'scroll-x-bar': scrollXBar, 'right-content': rightContent}
  }
</script>
<style>
  .wrap{
    margin-left: 60px;
    width: calc(100% - 60px);
    overflow: hidden;
    position: relative;
  }
  .wrap:after{
    content: '';
    display: block;
    clear: both;
  }
  .contentWrap {
    width: 70%;
    float: left;
  }
  .contentWrap .main_content {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .contentWrap ul, .rightWrap ul{
    /*width: auto;*/
    box-sizing: border-box;
    font-size: 0;
    cursor: pointer;
  }
  .contentWrap .main_content .tbodyWrap, .contentWrap .main_content .theadWrap {
    width: 120%;
  }
  .theadWrap{
    position: relative;
    z-index: 99;
  }
  
  .theadWrap ul li {
    background: #ebebeb;
  }
  .tbodyWrap ul li {
    background: #3b3b3b;
    color: #fff;
  }
  .wrap ul li {
    display: inline-block;
    border: 1px solid black;
    border-left: none;
    border-top: none;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .rightWrap {
    position: relative;
    z-index: 88;
    width: 15%;
    float: left;
  }
  .rightWrap ul li {
    display: inline-block;
    border: 1px solid black;
    border-left: none;
    border-top: none;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .rightWrap ul li:first-child {
    border-left: 1px solid black;
  }
  .tbodyWrap .delay li{
    background-color: red;
  }
  .tbodyWrap .active li{
    background-color: orange;
  }
  .tbodyWrap .uniqueClass{
    background-color: #fff8c6;
    color: black;
  }
  .tbodyWrap .preFlight li{
    background-color: #b8ff3f;
    color: black;
  }
  .rightWrap .tbodyWrap .fixDataBac{
    background: #f5501f;
  }
  .rightWrap .tbodyWrap .noFixDataBac{
    background: #3b3b3b;
  }
  /*搜索索引*/
  .tbodyWrap .searchTd li{
    background: #bfa;
  }
  .contentWrap .tbodyWrap  .selectTr li{
    background: pink;
  }
  #tab li {
    position: relative;
  }
  .ww {     
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    /*margin-right: -1px;*/
    background:  #e8e8e8;         
    cursor: e-resize;
  }
 .fixed-x-bar{
    position: absolute;
    z-index: 1001;
    top: 0;
    height: 10px;
    background: #2a2a2a;
    border-radius: 0px 5px 5px 0;
  }       
  .tbodyWrap .firstClass li {
    background: #31849B;
  }
  .tbodyWrap .secondClass li {
    background: #E5E0EC;
  }
  .tbodyWrap .thirdClass li {
    background: #FCD5B4;
  }
  .tbodyWrap .forthClass li {
    background: #B2A1C7;
  }
  .tbodyWrap .fifthClass li {
    background: #E6B9B8;
  }
  .tbodyWrap .sixClass li {
    background: #D7E4BC;
  }
  .tbodyWrap .sevenClass li {
    background: #538ED5;
  }
  
</style>