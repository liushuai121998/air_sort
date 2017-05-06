export default {
    /**
     * 寻找
     * @param {*} state 
     * @param {*} arr 
     */
    SEARCH(state, arr) {
        state.searchIndexArr = arr
    },
    /**
     * 新增数据
     * @param {*} state 
     * @param {*} str 
     */
    ADD_DATA(state, str) {
        state.data.contentData.push(str)
    },
    ADD_FIX_DATA(state, str) {
        state.data.fixData.push(str)
    },

    /**
     * 修改
     * @param {*} state 
     * @param {*} num 机位号 
     */
    SET_DATA(state, num) {
        // for (let i = 0, len = arr.length; i < len; i++) {
        //     state.data.contentData[arr[i] - 1]['task'] = '补班'
        // }


        // 将选中的tr删除之后将id值 置空
        let l = state.selectTrArr.length
        for (let h = 0; h < l; h++) {
            // state.selectTrArr[h].contentEditable = 'true'
            // 
            state.selectTrArr[h].onblur = function() {
                if (confirm('确定修改吗？')) {
                    // this.contentEditable = 'false'
                }
            }

        }
    },
    /**
     * 删除
     * @param {*} state 
     * @param {*} arr 
     */
    DELETE_DATA(state, delInfo) {
        //console.log(state.selectIndexArr, 'top')
        // 根据输入的值删除对应的tr
        //for (let i = 0, len = arr.length; i < len; i++) {
        // 这是根据索引删除
        // state.data.contentData.splice(arr[i] - 1, 1)
        //}
        //console.log(state.selectIndexArr.length)
        if (state.data.contentData[delInfo['j']]['airPos'] == delInfo['text']) {
            state.data.contentData.splice(delInfo['j'], 1)
        }

        // 选中的tr(点击选中的) 删除选中的tr   新添加的选中了删除不了？？？
        //let length = state.selectIndexArr.length
        // console.log(state.selectIndexArr, '_______________________________________________')
        // for (let j = 0; j < length; j++) {
        //     state.data.contentData.splice(state.selectIndexArr[j] - 1, 1)
        //     state.data.fixData.splice(state.selectIndexArr[j] - 1, 1)
        // }

        // 将选中的tr删除之后将id值 置空
        // state.selectTrArr = state.selectTrArr.filters((item, index) => {
        //     return item.id
        // })
        var indexFlag = 0
        console.log(state.selectIndexArr)
        state.selectIndexArr.sort().forEach(function(item, index) {
            state.data.contentData.splice(item - indexFlag, 1)
            console.log(item, "++", index)
            indexFlag++
        });
        state.selectIndexArr = []


        // state.selectIndexArr = []
        // state.selectTrArr = []
        // console.log(state.selectIndexArr, 'bottom')
    },


    /**
     * 保存选中的tr的索引进行修改和删除
     * @param {*} state 
     * @param {*} arr 
     */
    SELECT_TR_INDEX(state, arr) {
        state.selectIndexArr = arr
    },
    /**
     * 保存选中的tr
     * @param {*} state 
     * @param {*} arr 
     */
    SELECT_TR(state, arr) {
        state.selectTrArr = arr
            // console.log(state.selectTrArr)
    },
    CHANGE_CLICK_STATE(state) {
        state.isClickDel = !state.isClickDel
    },
    /**
     * 排序
     * @param {*} state 
     */
    SORT_TABLE(state, param) {
        if (Object.is(Number(state.data.contentData[0][param]), NaN)) {
            state.data.contentData.sort(function(a, b) {
                return state.sort ? a[param] > b[param] : b[param] > a[param]
            })
        } else {
            state.data.contentData.sort(function(a, b) {
                return state.sort ? a[param] - b[param] : b[param] - a[param]
            })
        }

        state.sort = !state.sort
        console.log(param)
    },
    /** 
     * 是否点击了机位这个表头
     * @param {*} state 
     * @param {*} isFlightClick 
     */
    IS_FLIGHT_CLICK(state, isFlightClick) {
        state.isFlightClick = isFlightClick
    },
    UPDATE_TD(state, inputValue) {
        var arr = []
        var arrIndex = []
        state.data.contentData.forEach(function(item, index) {
            if (item.airPos.search(inputValue) === 0) {
                arrIndex.push(index)
            }
        })
        var flag = 0
        arrIndex.forEach(function(item) {
            state.data.contentData.unshift(state.data.contentData.splice(item, 1)[0])

        })


        state.inputValue = inputValue
    }
    /**
     * 高亮显示的tr
     */
    // HIGH_LIGHT_TR(state, trNode) {
    //     state.highLightTr.push(trNode)
    //         // console.log(state.highLightTr)
    // },
    /***
     * 将高亮的tr置空
     */
    // HIGH_LIGHT_TR_EMPTY(state) {
    //     state.highLightTr = []
    //     console.log(state.highLightTr)
    // }
}