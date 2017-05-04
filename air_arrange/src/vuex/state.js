let arr = []
for (let i = 0; i < 150; i++) {
    let randomNum = Math.round(Math.random() * 200)
    arr.push(randomNum)
}
let strRandomArr = ['1225', '1118', '-']

let data = require('../../dataTest.json')
export default {
    data,
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
    isFlightClick: false
}