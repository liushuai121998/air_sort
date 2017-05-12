let arr = []
for (let i = 0; i < 150; i++) {
    let randomNum = Math.round(Math.random() * 200)
    arr.push(randomNum)
}
let strRandomArr = ['1225', '1118', '-']

let data = require('../../data.json')
let cloneData = JSON.parse(JSON.stringify(data))
let thLeftData = [{ title: '', width: '44px' }, { title: '月/日', width: '69px' }, { title: '标记', width: '42px' }, { title: '主航班号', width: '85px' },
        { title: '共享航班号', width: '151px' }, { title: '机号', width: '65px' }, { title: '类型', width: '69px' }, { title: '机型', width: '75px' }, { title: '任务', width: '70px' },
        { title: '航班状态', width: '131px' }, { title: '航线', width: '99px' }, { title: '机位', width: '64px' }, { title: '登机口', width: '69px' }, { title: '计到', width: '54px' },
        { title: '计离', width: '54px' }, { title: '预离', width: '54px' }, { title: '实离', width: '54px' }, { title: '预位', width: '54px' }, { title: '跑道', width: '53px' }
    ]
    // let thLeftData = thLeftData = [{ title: '', width: '5%' }, { title: '月/日', width: '5%' }, { title: '标记', width: '5%' }, { title: '主航班号', width: '6%' },
    //     { title: '共享航班号', width: '9%' }, { title: '机号', width: '5%' }, { title: '类型', width: '5%' }, { title: '机型', width: '6%' }, { title: '任务', width: '5%' },
    //     { title: '航班状态', width: '8%' }, { title: '航线', width: '6%' }, { title: '机位', width: '5%' }, { title: '登机口', width: '5%' }, { title: '计到', width: '5%' },
    //     { title: '计离', width: '5%' }, { title: '预离', width: '5%' }, { title: '实离', width: '5%' }, { title: '预位', width: '5%' }, { title: '跑道', width: '5%' }
    // ]
let thRightData = [
        { title: '进港桥载开始', width: '54px', col: 0 }, { title: '进港撤桥结束', width: '54px', col: 0 }, { title: '进港撤桥载', width: '114px', col: 2 }, { title: '上轮档(结束)', width: '109px', col: 2 }
    ]
    // let thRightData = [
    //     { title: '进港桥载开始', width: '15%', col: 0 }, { title: '进港撤桥结束', width: '15%', col: 0 }, { title: '进港撤桥载', width: '35%', col: 2 }, { title: '上轮档(结束)', width: '35%', col: 2 }
    // ]
export default {
    data: Object.freeze(data),
    inputValue: "",
    cloneData,
    thLeftData,
    thRightData,
    arr,
    strRandomArr,
    // 搜索的索引
    searchIndexArr: [],
    // 选中tr的索引
    selectIndexArr: [],
    // 选中的tr
    selectTrArr: [],
    // 是否按下删除按钮
    isClickDel: false,
    isFlightClick: false,
    // 排序 降序或升序
    sort: true,
    // 检索到的数据
    searchData: []
}