<template>
  <!--table内容区-->
  <div class="table-content" :style="{height: height - 30 + 'px'}">
    <table border="0" cellspacing="0" cellpadding="0" class="table">
      <thead>
        <tr>
          <th v-for="(item, index) in thData" v-if="!Array.isArray(item)" :style="{width: widthArrCom[index]}">{{item}}</th>
          <th v-else :colspan="item[2]" :style="{width: widthArrCom[index]}">{{item[0]}}</th>
        </tr>
      </thead>
      <tbody class="scrollTbody">
          <tr v-for="(item, index) in tdData" :class="{active: item['task'] === '补班', delay: item['flightState'] === '到达/延误'}">
            <td :style="{width: widthArrCom[0]}">{{index + 1}}</td>
            <td v-for="(str, key) in item" v-if="!Array.isArray(str)" :style="{width: tdWidthArrCom[key]}">{{str}}</td>
            <td v-else v-for="s in str" :style="{width: (parseInt(tdWidthArrCom[key]) -1 )/2 + 'px'}">{{s}}</td>
          </tr>
      </tbody>
    </table>
    <scroll-bar></scroll-bar>
  </div>
</template>
<script>
  import scrollBar from './scrollBar'
  import mockData from '../utils/mockjs'
  export default {
    data () {
        return {
            thData: ['-', '月/日', '标记', '主航班号',
              '共享航班号', '机号', '类型', '机型', '任务',
              '航班状态', ['航线', 40, 0], '机位', '登机口', '计到',
              '计离', '预离', '实离', '预位', '跑道',
              ['进港桥载开始', 10, 0], ['进港撤桥结束', 10, 0], ['进港撤桥载', 20, 2], ['上轮档(结束)', 20, 2]],
            tdData: null,
            height: window.innerHeight,
            widthArr: [],
            tdWidthArr: {}
        }
    },
    created () {
        this.$http.get('/api/data')
          .then(res => {
              // 请求的数据
              // this.tdData = res.data.data
          })
        this.$http.get('http://g.cn')
          .then((data) => {
            console.log(data.body.array)
            this.tdData = data.body.array
        }, () => {

        })
        setInterval(() => {
            this.$http.get('http://g.cn')
              .then((data) => {
                //this.tdData = data.body.array
            }, () => {

            })
        }, 5000)
    },
    computed: {
        widthArrCom () {
            this.thData.forEach((item, index) => {
                if(!Array.isArray(item)){
                    // 不是数组
                  this.widthArr.push(item.length*30 + 'px')
                }else {
                    // 是数组
                  this.widthArr.push(item[0].length*item[1] + 'px')
                }
            })
            return this.widthArr
        },
        tdWidthArrCom () {
          // this.tdData[0]
          var count = 0
          for(var n in this.tdData[0]){
              // console.log(n)
              count++
              this.tdWidthArr[n] = this.widthArr[count]
          }
          console.log(this.tdWidthArr)
          return this.tdWidthArr
        }
    },
    components: {'scroll-bar': scrollBar}
  }
</script>
<style>
  .table-content{
    position: relative;
    margin-left: 80px;
    overflow: hidden;
  }
  .table{
    position: relative;
    height: 100%;
    width: 100%;
    border: none;
    border-collapse: collapse;
    border-spacing: 0;
    display: inline-block;
  }
  .table-right{
    display: inline-block;
  }
  thead{
    position: absolute;
    z-index: 99;
  }
  tbody{
    position: absolute;
    z-index: 9;
    left: 0;
    top: 33px;
  }
  table, th, td{
    border: 1px solid black;
  }

  th{
    background-color: #EBEBEB;
    vertical-align: middle;
    text-align: center;
    /*height: 30px;*/
    /*line-height: 30px;*/
  }
  td{
    background-color: #3B3B3B;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
  }
  .active td{
    background: orange;
  }
  .delay td{
    background: red;
  }
  tr:hover td{
    background: green;
  }
</style>
