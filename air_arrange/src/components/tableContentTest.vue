<template>
  <div class='wrap' ref='wrap'>
    <div class='merge_wrap' v-show='!isDiviScreen' ref='mergeWrap'> 
      <div class='merge_title'>到离港</div>
      <div class='contentWrap'>
        <div class='main_content'>
          <div class='theadWrap  scrollX' ref='theadWrap'>
           <ul class='tab'>
             <li v-for='(item, index) in thLeftData' :style='{width: item.width}' :key='index' @click='sortTable($event, index, tdData)' class='sort_li'><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
             <li v-for='(item, serIndex) in tdData[0]["services"]' :style='{width: serviceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
             <li v-else-if='item.sorE === "E"' :style='{width: serviceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
           </ul>
          </div> 
          <div class='tbodyWrap scrollX scrollTbody' ref='tbodyWrap'>
            <ul v-for='(tdItem, index) in tdData' :key='index' @click='selectTr($event,index)' :class=''>
                  <!--<li :style='{width: thLeftData[0]["width"]}'>{{index + 1}}</li>-->
                  <!--<li v-for='(str, key, i) in tdItem[1]' :key='i' :style='{width: backData[key]}'  :class='{uniqueClass: key === "flightState", selectLi: tdItem[3]&& tdItem[3].key === key}'  @click='selectTr($event,index, key, tdData)'>{{str}}</li>-->
                  <!--<li v-for='(str, key, i) in tdItem' v-if="thLeftData[i] && thLeftData[i]['name'] === key">{{str}}</li>-->
                  <li :style='{width: thLeftData[0]["width"]}'>{{index+1}}</li>
                  <li v-for='(item, i) in thLeftData.slice(1)' :style='{width: item.width}' :key='i' v-if='!tdItem[item["name"]] || tdItem[item["name"]].indexOf("2017-") < 0'>{{tdItem[item['name']]}}</li>
                  <li v-else-if="item['name'] === 'operationDate'" :style='{width: item.width}' :class='{selectLi: tdItem["class"]&&item["class"]}'>{{tdItem[item['name']].slice(5, 10)}}</li>
                  <li v-else :style='{width: item.width}'>{{tdItem[item['name']].slice(11, 16).split(':').join('')}}</li>
                  <!--服务部分-->
                  <li v-for='(serItem, serIndex) in tdItem["services"]' :style='{width: serviceWidth[serIndex]["width"]}'>
                    <!--{{serviceData[index][serIndex]['planTime']}}-->
                    <span :style='{display: "inline-block", width: parseInt(serviceWidth[serIndex]["width"])/2+"px", borderRight: "1px solid black", boxSizing: "border-box", height: "100%"}'>{{tdItem["services"][serIndex]['planTime']}}</span><!--
                    --><span :style='{display: "inline-block", width: parseInt(serviceWidth[serIndex]["width"])/2+"px", height: "100%"}'>{{serviceData[index][serIndex]['actualTime']}}</span>
                  </li>
            </ul>
          </div>
        </div>
      </div>
      <div class='rightWrap'>
        <div class='theadWrap'>
          <ul>
            <!--<li v-for='(item, index) in thRightData' :style='{width: item.width}' :key='index'><div>{{item.title}}</div></li>-->
            <!--<li v-for='(item, index) in tdData[0]["services"]'>{{item.detailName}}</li>-->
          </ul>
        </div>
        <div class='tbodyWrap scrollTbody'>
          <!--<ul v-for='(item, index) in tdData' :key='index'>
            <li v-for='(str, key, i) in item[2]' :key='i' :style='{width: fixTdWidth[key]}' :class='{fixDataBac: randomIndexArr.indexOf(index) > 0, noFixDataBac: str===strRandomArr[Math.round(Math.random()*2)]}'>{{str}}</li>
          </ul>-->
          
        </div>
      </div>
      <scroll-bar></scroll-bar>
      <scroll-x-bar></scroll-x-bar>
      <right-content></right-content>
    </div>
    <div class='divi_wrap' v-show='isDiviScreen'>
      <div class='divi_content1' ref='diviContent1'>
          <div class='title_come'>到港</div>
          <div class='contentWrap'>
            <div class='main_content'>
              <div class='theadWrap  scrollX' ref='divi1TheadWrap'>
              <!--<ul class='tab'>
                <li v-for='(item,index) in tabComeData' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, tabComeData)'><span>{{item.title}}</span><div class='ww'></div></li>
              </ul>-->
              <ul class='tab'>
                <li v-for='(item, index) in tabComeData' :style='{width: item.width}' :key='index' @click='sortTable($event, index, comeData)' class='sort_li'><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
                <li v-for='(item, serIndex) in comeData[0]["services"]' :style='{width: comeServiceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
                <li v-else-if='item.sorE === "E"' :style='{width: comeServiceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
              </ul>
              </div>
              <div class='tbodyWrap scrollX scrollTbody'  ref='divi1TbodyWrap'>
                <!--<ul v-for='(tdItem, index) in comeData' :key='index' :class='{selectTr: tdItem[3]&& tdItem[3].classParent === "selectTr"}'>
                      <li :style='{width: tabComeData[0]["width"]}'>{{index + 1}}</li>
                      <li v-for='(str, key, i) in tdItem[1]' :key='i' :style='{width: backComeData[key]}' @click='selectTr($event,index, key, comeData)' :class='{selectLi: tdItem[3]&& tdItem[3].key === key}'>{{str}}</li>
                </ul>-->
                <ul v-for='(tdItem, index) in comeData' :key='index' @click='selectTr($event,index)'>
                  <li :style='{width: tabComeData[0]["width"]}'>{{index+1}}</li>
                  <li v-for='(item, i) in tabComeData.slice(1)' :style='{width: item.width}' :key='i' v-if='!tdItem[item["name"]] || tdItem[item["name"]].indexOf("2017-") < 0'>{{tdItem[item['name']]}}</li>
                  <li v-else-if="item['name'] === 'operationDate'" :style='{width: item.width}'>{{tdItem[item['name']].slice(5, 10)}}</li>
                  <li v-else :style='{width: item.width}'>{{tdItem[item['name']].slice(11, 16).split(':').join('')}}</li>
                  <!--服务部分-->
                  <li v-for='(serItem, serIndex) in tdItem["services"]' :style='{width: comeServiceWidth[serIndex]["width"]}'>
                    <!--{{serviceData[index][serIndex]['planTime']}}-->
                    <span :style='{display: "inline-block", width: parseInt(comeServiceWidth[serIndex]["width"])/2+"px", borderRight: "1px solid black", boxSizing: "border-box", height: "100%"}'>{{tdItem["services"][serIndex]['planTime']}}</span><!--
                    --><span :style='{display: "inline-block", width: parseInt(comeServiceWidth[serIndex]["width"])/2+"px", height: "100%"}'>{{serviceData[index][serIndex]['actualTime']}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class='rightWrap'>
            <div class='theadWrap'>
              <!--<ul>
                <li v-for='(item, index) in thRightData' :style='{width: item.width}' :key='index'><div>{{item.title}}</div></li>
              </ul>-->
            </div>
            <div class='tbodyWrap scrollTbody'>
              <!--<ul v-for='(item, index) in comeData' :key='index'>
                <li v-for='(str, key, i) in item[2]' :key='i' :style='{width: fixTdWidth[key]}' :class='{fixDataBac: randomIndexArr.indexOf(index) > 0, noFixDataBac: str===strRandomArr[Math.round(Math.random()*2)]}'>{{str}}</li>-->
                
                <!--<li v-for='(str, key, i) in item[2]' :key='i' :style='{width: fixTdWidth[key]}'>{{str}}</li>-->
              <!--</ul>-->
            </div>
          </div>
          <div class='scroll_bar'>
            <span class='scroll_bar_child'></span>
          </div>
          <scroll-x-bar></scroll-x-bar>
      </div>
      <div class='divi_content2' ref='diviContent2'>
          <div class='title_leave'><span>离港</span><div class='divi_height_scale'></div></div>
          <div class='contentWrap'>
            <div class='main_content'>
              <div class='theadWrap scrollX' ref='divi2TheadWrap'>
                <!--<ul class='tab'>
                  <li v-for='(item,index) in tabLeaveData' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, tabLeaveData)'><span>{{item.title}}</span><div class='ww'></div></li>
                </ul>-->
                <ul class='tab'>
                  <li v-for='(item, index) in tabLeaveData' :style='{width: item.width}' :key='index' @click='sortTable($event, index, leaveData)' class='sort_li'><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
                  <li v-for='(item, serIndex) in leaveData[0]["services"]' :style='{width: leaveServiceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
                  <li v-else-if='item.sorE === "E"' :style='{width: leaveServiceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
                </ul>
              </div>
              <div class='tbodyWrap scrollX scrollTbody' ref='divi2TbodyWrap'>
                <!--<ul v-for='(tdItem, index) in leaveData' :key='index' :class='{selectTr: tdItem[3]&& tdItem[3].classParent === "selectTr"}'>
                      <li :style='{width: tabLeaveData[0]["width"]}'>{{index + 1}}</li>
                      <li v-for='(str, key, i) in tdItem[1]' :key='i' :style='{width: backLeaveData[key]}' @click='selectTr($event,index,key, leaveData)' :class='{selectLi: tdItem[3]&& tdItem[3].key === key}'>{{str}}</li>
                </ul>-->
                <ul v-for='(tdItem, index) in leaveData' :key='index' @click='selectTr($event,index)'>
                  <li :style='{width: tabLeaveData[0]["width"]}'>{{index+1}}</li>
                  <li v-for='(item, i) in tabLeaveData.slice(1)' :style='{width: item.width}' :key='i' v-if='!tdItem[item["name"]] || tdItem[item["name"]].indexOf("2017-") < 0'>{{tdItem[item['name']]}}</li>
                  <li v-else-if="item['name'] === 'operationDate'" :style='{width: item.width}'>{{tdItem[item['name']].slice(5, 10)}}</li>
                  <li v-else :style='{width: item.width}'>{{tdItem[item['name']].slice(11, 16).split(':').join('')}}</li>
                  <!--服务部分-->
                  <li v-for='(serItem, serIndex) in tdItem["services"]' :style='{width: leaveServiceWidth[serIndex]["width"]}'>
                    <!--{{serviceData[index][serIndex]['planTime']}}-->
                    <span :style='{display: "inline-block", width: parseInt(leaveServiceWidth[serIndex]["width"])/2+"px", borderRight: "1px solid black", boxSizing: "border-box", height: "100%", textAlign: "center"}'>{{tdItem["services"][serIndex]['planTime']}}</span><!--
                    --><span :style='{display: "inline-block", width: parseInt(leaveServiceWidth[serIndex]["width"])/2+"px", height: "100%", textAlign: "center"}'>{{serviceData[index][serIndex]['actualTime']}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class='rightWrap'>
            <div class='theadWrap'>
              <!--<ul>
                <li v-for='(item, index) in thRightData' :style='{width: item.width}' :key='index'><div>{{item.title}}</div></li>
              </ul>-->
            </div>
            <div class='tbodyWrap scrollTbody'>
              <!--<ul v-for='(item, index) in leaveData' :key='index'>
                <li v-for='(str, key, i) in item[2]' :key='i' :style='{width: fixTdWidth[key]}' :class='{fixDataBac: randomIndexArr.indexOf(index) > 0, noFixDataBac: str===strRandomArr[Math.round(Math.random()*2)]}'>{{str}}</li>-->
                <!--<li v-for='(str, key, i) in item[2]' :key='i' :style='{width: fixTdWidth[key]}'>{{str}}</li>-->
              <!--</ul>-->
            </div>
          </div>
          <div class='scroll_bar'>
            <span class='scroll_bar_child'></span>
          </div>
          <scroll-x-bar></scroll-x-bar>
      </div>
      <right-content></right-content>
    </div>
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
        tdData: this.$store.state.initData,
        comeTemp: null,
        leaveTemp: null,
        isFirstUpdate: false,
        isMergeFirstUpdate: false,
        selectTarget: '',
        serviceData: this.$store.state.serviceData, 
        comeData: this.$store.state.comeData,
        leaveData: this.$store.state.leaveData,
        serviceWidth: this.$store.state.serviceWidth,
        comeServiceWidth: this.$store.state.comeServiceWidth,
        leaveServiceWidth: this.$store.state.leaveServiceWidth,
        target: null,
        classInfo: this.$store.state.classInfo
      }
    },
    created () {
      // Object.prototype.hasOwnProperty()
      this.randomIndexArr = this.$store.state.arr 
      
      this.strRandomArr = this.$store.state.strRandomArr 

      // this.tdData = this.$store.state.data.contentData
      // 排序
      
      // this.$store.commit('FLY_CONTROL_SORT', this)
      //this.$http.post('http://192.168.7.53:8080/getInitData', {"username": 'ghms_admin'}).then((res) => {

      // this.$http.get('/api/data').then((res) => {
      //   console.log(res.data.data.d.flight)
      //   // this.tdData = res.data.data.d.flight

      //   // this.$store.commit('GET_INIT_DATA', res.data.data.d.flight)
      //   res.data.data.d.flight.forEach(item => {
      //   this.serviceData.push(item['services'])
      //   })
      //   // console.log(this.serviceData)
      //   // console.log(this.tdData[0]['services'])
      //   // 到港
      //   this.comeData = this.tdData.filter((item) => {
      //     return item.aOrD === 'A'
      //   })
      //   this.$store.commit('COME_DATA', this.comeData)
      //   // 离港
      //   this.leaveData = this.tdData.filter((item) => {
      //     return item.aOrD === 'D'
      //   })

      //   this.$store.commit('LEAVE_DATA', this.leaveData)
      // }, (error) => {
      //   console.log('error')
      // }) 
      this.$store.commit('GET_INIT_DATA', this)
    },
    mounted () {
      
      // this.setInter()
      // this.$store.dispatch('RANDOM_DATA')
     if(this.$store.state.isDiviScreen) {
        this.$refs.diviContent1.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        this.$refs.diviContent2.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'

        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.scrollBar('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
        $scrollBar.scrollXBar('.scroll-x', '.scrollX', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})

        $scrollBar.diviHeightScale('.divi_height_scale', '.scroll_bar_child', '.scrollTbody', {divi1: this.$refs.diviContent1, divi2: this.$refs.diviContent2})
       
        // 鼠标滚动
        $scrollBar.mouseScroll('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
     }else {
        this.$refs.mergeWrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.scrollBar('.scroll', '.scrollTbody', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null})
        $scrollBar.scrollXBar('.scroll-x', '.scrollX', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
        $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null}, this)
        $scrollBar.mouseScroll('.scroll', '.scrollTbody', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null})
     }
     this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'

     $scrollBar.resize('.scroll-x', '.scroll', {merge: '.merge_wrap', divi1: '.divi_content1', divi2: '.divi_content2'}, {content: '.contentWrap', right: '.rightWrap'},  this.$store.state.isDiviScreen)
     
    },
    updated () {
      if(!this.$store.state.isDiviScreen) {
                let rightContent = document.querySelector('.merge_wrap').querySelector('.right_message')
                this.$store.commit('RIGHT_CONTENT', {vm: this, rightContent})
            } else {
                let rightContent = document.querySelector('.divi_wrap').querySelector('.right_message')
                this.$store.commit('RIGHT_CONTENT', {vm: this, rightContent})
                console.log(rightContent)
          }
      if(this.$store.state.isDiviScreen && !this.isFirstUpdate) {
        // 第一次进入
        this.isFirstUpdate = true
        this.isMergeFirstUpdate = false
        this.$refs.diviContent1.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        this.$refs.diviContent2.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.scrollBar('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
        // 鼠标滚动
        $scrollBar.mouseScroll('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
        this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.resize('.scroll-x', '.scroll', {merge: '.merge_wrap', divi1: '.divi_content1', divi2: '.divi_content2'}, {content: '.contentWrap', right: '.rightWrap'},  this.$store.state.isDiviScreen)
        $scrollBar.diviHeightScale('.divi_height_scale', '.scroll_bar_child', '.scrollTbody', {divi1: this.$refs.diviContent1, divi2: this.$refs.diviContent2})
        
      }else if(!this.$store.state.isDiviScreen && !this.isMergeFirstUpdate){
        // 第一次进入
        this.isMergeFirstUpdate = true
        this.isFirstUpdate = false
        this.$refs.mergeWrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null}, this)
        $scrollBar.scrollBar('.scroll', '.scrollTbody', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null})

        // 鼠标滚动
        $scrollBar.mouseScroll('.scroll', '.scrollTbody', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null})

        this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.resize('.scroll-x', '.scroll', {merge: '.merge_wrap', divi1: '.divi_content1', divi2: '.divi_content2'}, {content: '.contentWrap', right: '.rightWrap'},  this.$store.state.isDiviScreen)
      }
        $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.scrollXBar('.scroll-x', '.scrollX', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})

        //$scrollBar.resize('.scroll', '.merge_wrap .scrollTbody', '.scroll-x', '.fixed-x-bar', '.wrap', this.$store.state.isDiviScreen)
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
      // selectTr (ev,index) {
      //   ev = ev || event
      //   if(this.$store.state.isClickDel) {
      //     // 删除之后将this.selectIndexArr, this.selectTrArr 置为空数组
      //     this.selectIndexArr = []
      //     this.selectTrArr = []
      //     this.$store.commit('CHANGE_CLICK_STATE')
      //   }
        
      //   // classList属性 toggle()切换(添加返回true 删除返回false) add()添加 remove()删除
      //    if(ev.target.parentNode.classList.toggle ('selectTr')){
      //       this.selectIndexArr.push(index)
      //       this.selectTrArr.push(ev.target.parentNode)
      //    }else{
      //       // this.selectIndexArr.indexOf(index) >= 0 && this.selectIndexArr.splice(this.selectIndexArr.indexOf(index),1)
      //       // this.selectTrArr.indexOf(ev.target.parentNode) >= 0 && this.selectTrArr.splice(this.selectTrArr.indexOf(ev.target.parentNode),1)
      //       this.selectIndexArr.splice(this.selectIndexArr.indexOf(index),1)
      //       this.selectTrArr.splice(this.selectTrArr.indexOf(ev.target.parentNode),1)

      //    }
      //    console.log(this.selectIndexArr, 'this.selectIndexArr')
      //    //传过去
      //    this.$store.commit('SELECT_TR_INDEX',{index: this.selectIndexArr, arr: this.selectTrArr})
         

      // },
      selectTr(ev, index) {
        if(!this.target) {
          this.target = ev.target
        }
        if(this.target != ev.target) {
          if(this.target.nodeName.toLowerCase() === 'li') {
            this.target.classList.remove('selectLi')
            this.target.parentNode.classList.remove('selectTr')
          }else if(this.target.nodeName.toLowerCase() === 'span') {
            this.target.classList.remove('selectLi')
            this.target.parentNode.parentNode.classList.remove('selectTr')
          }
          this.target = ev.target

        }
       
        if(ev.target.nodeName.toLowerCase() === 'li') {
          // 保存当前数据的id
          let liNodes = ev.target.parentNode.getElementsByTagName('li');
          let liTargetIndex = [].slice.call(liNodes).indexOf(ev.target)
          // console.log(liTargetIndex)
          //this.$store.commit('REMOVE_CLASS')
          //this.$store.commit('ADD_CLASS', {vm: this, liTargetIndex, index})
          ev.target.classList.add('selectLi')
          ev.target.parentNode.classList.add('selectTr')
          
          //ev.target.parentNode.style.backgroundColor = '#bfa'
           //ev.target.parentNode.className="mytestclass";
             //console.log(ev.target.parentNode);
          //console.log(ev.target.parentNode.classList);
          //this.$store.commit('SAVE_INDEX', {index, targetIndex: liTargetIndex, vm: this})

         //this.tdData[index].myclass="selectTr";
          // let obj = this.tdData[index]
         //  this.$set(this.tdData, index, obj)
          // this.tdData[index].myclass="selectTr";
          // let obj = this.tdData[index]
          // this.$set(this.tdData, index, obj)
        } else if(ev.target.nodeName.toLowerCase() === 'span') {
          // console.log(ev.target.parentNode)
         ev.target.classList.add('selectLi')
         ev.target.parentNode.parentNode.classList.add('selectTr')
           //this.tdData[index].myclass="selectTr"; //排序可用
          // let obj = this.tdData[index]
          // this.$set(this.tdData, index, obj)
          //this.tdData[index].myclass="selectTr";
          //   console.log(ev.target.parentNode);
          // console.log(ev.target.parentNode.classList);
        }
        // 数据驱动
        // if(this.selectTarget === ev.target) {
          
        // }else {
        //   // 添加class之前将之前的class都清掉
        //   this.$store.commit('REMOVE_CLASS')
        //   this.$store.commit('ADD_CLASS', {data, index, key})
        //   this.selectTarget = ev.target
          // console.log(ev.target.parentNode.offsetParent)
          // if(data === this.$store.state.comeData && this.$store.state.leaveData.indexOf(this.$store.state.comeData[index]) >= 0) {
          //   let targetIndex = this.$store.state.leaveData.indexOf(this.$store.state.comeData[index])
          //   // console.log(this.$refs.divi2TbodyWrap.getElementsByTagName('ul')[targetIndex])
          //   let targetDom = this.$refs.divi2TbodyWrap.getElementsByTagName('ul')[targetIndex]
          //   $scrollBar.targetMove(targetDom, this.$refs.diviContent2)
          // } else if(data === this.$store.state.leaveData && this.$store.state.comeData.indexOf(this.$store.state.leaveData[index]) >= 0) {
          //   let targetIndex = this.$store.state.comeData.indexOf(this.$store.state.leaveData[index])
          //   // console.log(this.$refs.divi2TbodyWrap.getElementsByTagName('ul')[targetIndex])
          //   let targetDom = this.$refs.divi1TbodyWrap.getElementsByTagName('ul')[targetIndex]
          //   $scrollBar.targetMove(targetDom, this.$refs.diviContent1)
          // }
       // }

        
      },
      // 表格排序
      sortTable (ev,index, data) {
        let str = ''
        let arrowNodes
        if(data === this.tdData) {
          str = 'merge'
          arrowNodes = document.querySelector('.merge_wrap').querySelectorAll('.arrow');
        }else if(data === this.comeData) {
          str = 'come'
          arrowNodes = document.querySelector('.divi_content1').querySelectorAll('.arrow');
        }else if(data === this.leaveData) {
          str = 'leave'
          arrowNodes = document.querySelector('.divi_content2').querySelectorAll('.arrow');
        }
        [].slice.call(arrowNodes).forEach((item) => {
          item.style.display = 'none'
        })
        
       

       if(this.target) {
          this.target.parentNode.classList.remove('selectTr')
          this.target.classList.remove('selectLi')
       }
       // console.log(ev.target.sort)
       

       let arrow
       if(ev.target.nodeName.toLowerCase() === 'li') {
         arrow = ev.target.querySelector('.arrow')
       }else {
         arrow = ev.target.parentNode.querySelector('.arrow')
       }

       if(ev.target.sort) {
         arrow.style.display = 'block'
         arrow.style.borderBottomColor = 'red' 
         arrow.style.borderTopColor = 'transparent'
       }else{
         arrow.style.display = 'block'
         arrow.style.borderBottomColor = 'transparent'
         arrow.style.borderTopColor = 'red'
       }

       this.$store.commit('SORT_TABLE', {str, target: ev.target, param: this.$store.state.thLeftData[index]['name'], vm: this})
 
        // 解决v-for强制刷新列表 this.$forceUpdate()
         //this.$forceUpdate()
         
      },
//       classManage(st1) {

//         console.log(st1.myclass);
//       return st1.myclass;
// // if(index==2)
// // {
// //    return "selectUl"
// // }
// //         console.log(1);
// //         if(st1 === this.classInfo['id']) {
// //           return "selectUl"
// //         }else {
// //           return ;
// //         }
//        }  
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
      backComeData () {
        this.comeTemp = JSON.parse(JSON.stringify(this.$store.state.data.contentData[0][1]))
          let count = 0
          for(var n in this.comeTemp){
            count++
            let comeTemp = this.$store.state.tabComeData[count]
            this.comeTemp[n] = comeTemp.width
          }
          return this.comeTemp
      },
      backLeaveData () {
        this.leaveTemp = JSON.parse(JSON.stringify(this.$store.state.data.contentData[0][1]))
          let count = 0
          for(var n in this.leaveTemp){
            count++
            let leaveTemp = this.$store.state.tabLeaveData[count]
            this.leaveTemp[n] = leaveTemp.width
          }
          return this.leaveTemp
      },
      thLeftData () {
        if(this.$store.state.isBai) {
          // this.$refs.mergeWrap.style.width = '100%'
          this.$refs.theadWrap.style.width = '100%'
          this.$refs.tbodyWrap.style.width = '100%'
          this.isFirst = true
        }
        return this.$store.state.thLeftData
      },
      // 到港数据
      tabComeData () {

        return this.$store.state.tabComeData
      },
      // 离港数据
      tabLeaveData () {

        return this.$store.state.tabLeaveData
      },
      thRightData () {

        return this.$store.state.thRightData

      },
      isDiviScreen () {
        return this.$store.state.isDiviScreen
      },
      // 到港数据
      // comeData () {
      //   return this.tdData.filter((item) => {
      //     return item.aOrD === 'A'
      //   })
      //   // return this.$store.state.comeData
      // },
      // 离港数据
      // leaveData () {
      //   // return this.$store.state.leaveData
      //   return this.tdData.filter((item) => {
      //     return item.aOrD === 'D'
      //   })
      // }
    },
    components: {'scroll-bar': scrollBar, 'scroll-x-bar': scrollXBar, 'right-content': rightContent}
  }
</script>
<style>

.mytestclass li  
{
  background-color: #b8ff3f !important;

}

  .divi_wrap:after {
    content: '';
    display: block;
    clear: both;
  }
  .divi_wrap {
    width: 85%;
  }
  .divi_wrap .divi_content1, .divi_wrap .divi_content2 {
    position: relative;
    width: 100%;
    float: left;
    /*border: 2px solid red;
    box-sizing: border-box;*/
    /*overflow: auto;*/
  }
  .divi_wrap .divi_content2 {
    z-index: 2000;
  }
  
  .divi_wrap .divi_content1 .contentWrap, .divi_wrap .divi_content2 .contentWrap {
    /*width: 80%;*/
    width: 100%;
  }
  .divi_wrap .divi_content1 .rightWrap, .divi_wrap .divi_content2 .rightWrap {
    /*width: 20%;*/
  }

  .divi_content1 .scroll_bar, .divi_content2 .scroll_bar {
    position: absolute;
    right: -15px;
    /*top: 68px;
    height: calc(100% - 68px);*/
    top: 0;
    height: 100%;
    width: 15px;
    background: #2A2A2A;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .divi_content1 .scroll_bar .scroll_bar_child, .divi_content2 .scroll_bar .scroll_bar_child {
    position: absolute;
    left: 0;
    top: 0;
    background: #808080;
    width: 100%;
    height: 50px;
    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .divi_content2 .divi_height_scale {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    cursor: n-resize;
  }

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
  .merge_wrap {
    width: 85%;
    /*position:relative;*/
  }
  .merge_wrap:after {
    content: '';
    display: block;
    clear: both;
  }
  .merge_title {
    position: relative;
    height: 34px;
    line-height: 34px;
    border: 1px solid black;
    border-left: none;
    box-sizing: border-box;
    background: #fff;
  }

  .contentWrap {
    width: 100%;
    float: left;
    box-sizing: border-box;
    border-right: 1px solid black;
  }
  .contentWrap .main_content {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }
  .title_come, .title_leave {
    position: relative;
    background: #fff;
    height: 34px;
    line-height: 34px;
    border: 1px solid black;
    border-left: none;
    box-sizing: border-box;
  }
  .title_leave {
    background: #fff;
  }

  .contentWrap ul, .rightWrap ul{
    /*width: auto;*/
    box-sizing: border-box;
    font-size: 0;
    cursor: pointer;
  }
  .contentWrap .main_content .tbodyWrap, .contentWrap .main_content .theadWrap {
    /*width: 150%;*/
    float: left;
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
    width: 20%;
    float: left;
    overflow: hidden;
  }
  /*.rightWrap .theadWrap {
    float: left;
  }*/
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
    background: #B8CF00;
  }
  .contentWrap .tbodyWrap .selectUl li {
    background: #B8CF00;
  }
  .theadWrap li {
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
    /*background: red;*/
    cursor: e-resize;
  }       
  .qq {     
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    /*margin-right: -1px;*/
    /*background:  #e8e8e8;         */
    background: red;
    cursor: e-resize;
  }
  /*.tbodyWrap .firstClass li {
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
  }*/
  .contentWrap .tbodyWrap ul .selectLi {
    background: #3b3b3b;
    border: 2px solid blue;
    box-sizing: border-box;
  }
  .contentWrap .tbodyWrap .selectTr li:nth-child(5) {

    border: 2px solid blue;
  }
  /*排序箭头*/
  .wrap li.sort_li .arrow {
    position: absolute;
    right: 4px;
    top: 50%;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    /*border-top-color: red;*/
    display: none;
  }
</style>