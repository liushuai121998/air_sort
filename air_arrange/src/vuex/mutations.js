export default {
    RANDOM_DATA(state) {
        let randomStrArr = ['task', 'flightState']
        let taskRandom = ['补班', '正班']
        let flightStateRandom = ['到达/无', '到达/延误', '前起/无']
        let length = state.data.contentData.length
        if (randomStrArr[Math.round(Math.random())] === 'flightState') {
            state.data.contentData[Math.round(Math.random() * (length - 1))]['flightState'] = flightStateRandom[Math.round(Math.random() * (flightStateRandom.length - 1))]
        } else {
            state.data.contentData[Math.round(Math.random() * (length - 1))]['task'] = taskRandom[Math.round(Math.random() * (taskRandom.length - 1))]
        }
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
    SET_DATA(state) {
        let randomStrArr = ['task', 'flightState']
        let taskRandom = ['补班', '正班']
        let flightStateRandom = ['到达/无', '到达/延误', '前起/无']
        state.selectIndexArr.forEach((item) => {
            if (randomStrArr[Math.round(Math.random())] === 'flightState') {
                state.data.contentData[item]['flightState'] = flightStateRandom[Math.round(Math.random() * (flightStateRandom.length - 1))]
            } else {
                state.data.contentData[item]['task'] = taskRandom[Math.round(Math.random() * (taskRandom.length - 1))]
            }

        })
    },

    /**
     * 删除
     * @param {*} state 
     * @param {*} arr 
     */
    DELETE_DATA(state) {
        // 将检索到的数据删除
        let flag = 0
        let cloneData = [].concat(state.data.contentData)
        let cloneIndex = [].concat(state.selectIndexArr)
        let selectData = []
        let isClick = true

        cloneIndex.forEach((item, index) => {
            selectData.push(state.data.contentData[item])
        })

        state.searchData.forEach((item, index) => {
            // 检索并选中该tr才删除
            if (selectData.indexOf(item) >= 0) {
                isClick = false
                state.data.contentData.splice(cloneData.indexOf(item) - flag, 1)
                flag++
            }
        })

        // 将选中tr的删除 删除之后selectTr这个类名还在
        state.selectTrArr.forEach((item, index) => {
            item.classList.remove('selectTr')
        })
        let indexFlag = 0
            // console.log(state.selectIndexArr)
            // 将索引进行排序state.selectIndexArr.sort()
        state.selectIndexArr.sort().forEach(function(item, index) {
            if (isClick) {
                state.data.contentData.splice(item - indexFlag, 1)
                console.log(item, "++", index)
                indexFlag++
            }
        });
        // 点击删除按钮之后将selectIndexArr 置为空数组
        state.selectIndexArr = []
        state.selectTrArr = []
    },
    /**
     * 保存选中的tr的索引进行修改和删除
     * @param {*} state 
     * @param {*} arr 
     */
    SELECT_TR_INDEX(state, obj) {
        state.selectIndexArr = obj.index
        state.selectTrArr = obj.arr
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
                // 字母数字排序
                return state.sort ? a[param] > b[param] : b[param] > a[param]
            })
        } else {
            // 数字排序 
            state.data.contentData.sort(function(a, b) {
                return state.sort ? a[param] - b[param] : b[param] - a[param]
            })
        }

        state.sort = !state.sort
            // console.log(param)
    },

    /**
     * 根据输入框输入的内容重新排序
     */
    UPDATE_TD(state, inputValue) {
        state.searchData = []
        var arrIndex = []
        state.data.contentData.forEach(function(item, index) {
            if (item.airPos.search(inputValue) === 0) {
                arrIndex.push(index)
            }
        })
        arrIndex.forEach(function(item) {
                // arr.splice(start, end) 返回一个数组保存的是删除的项
                // arr.unshift() 在数组的最前面添加
                // 把删除的项放到最前面
                state.data.contentData.unshift(state.data.contentData.splice(item, 1)[0])
                state.searchData.unshift(state.data.contentData[0])
            })
            // console.log(state.searchData)
        state.inputValue = inputValue
    },
    /**
     * 搜索
     */
    SEARCH(state, searchInfo) {
        let utilSearch = {

            getIndexArr(val, param) {
                let indexArr = []
                state.data.contentData.forEach((item, index) => {
                    if (item[param] != val[0]) {
                        indexArr.push(index)
                    }
                })
                this.spliceData(indexArr)
            },
            spliceData(indexArr) {
                let flag = 0
                indexArr.forEach((item) => {
                    state.data.contentData.splice(item - flag, 1)

                    state.data.fixData.splice(item - flag, 1)
                    flag++
                })
            }
        }
        if (searchInfo && searchInfo.name) {
            switch (searchInfo.name) {
                case 'airPos':
                    if (searchInfo.val.indexOf('-') > 0) {
                        searchInfo.val.splice(searchInfo.val.indexOf('-'), 1)
                        let indexArr = []
                        state.data.contentData.forEach((item, index) => {
                            if (item['airPos'] < searchInfo.val[0] || item['airPos'] > searchInfo.val[1]) {
                                indexArr.push(index)
                            }
                        })
                        utilSearch.spliceData(indexArr)
                            // 检索到之后排序
                        state.data.contentData.sort((a, b) => {
                            return a['airPos'] - b['airPos']
                        })


                    } else if (searchInfo.val.length > 1) {
                        let indexArr = []
                        console.log(searchInfo.val)
                        state.data.contentData.forEach((item, index) => {
                            if (item['airPos'] != searchInfo.val[0] || item['airPos'] != searchInfo.val[1]) {
                                indexArr.push(index)
                            }
                        })
                        utilSearch.spliceData(indexArr)
                    } else {

                        let indexArr = []
                        console.log(searchInfo.val)
                        state.data.contentData.forEach((item, index) => {
                            if (item['airPos'] != searchInfo.val[0]) {
                                indexArr.push(index)
                            }
                        })
                        utilSearch.spliceData(indexArr)
                    }
                    break
                case 'calCome':
                    if (searchInfo.val.indexOf('-') > 0) {
                        searchInfo.val.splice(searchInfo.val.indexOf('-'), 1)
                        let indexArr = []
                        state.data.contentData.forEach((item, index) => {
                            if (item['calCome'] < searchInfo.val[0].split(':').join('') || item['calCome'] > searchInfo.val[1].split(':').join('')) {
                                indexArr.push(index)
                            }
                        })
                        utilSearch.spliceData(indexArr)
                            // 检索到之后排序
                        state.data.contentData.sort((a, b) => {
                            return a['calCome'] - b['calCome']
                        })
                    } else {
                        let indexArr = []
                        state.data.contentData.forEach((item, index) => {
                            if (item['calCome'] != searchInfo.val[0].split(':').join('')) {
                                indexArr.push(index)
                            }
                        })
                        utilSearch.spliceData(indexArr)
                    }
                    break
                case 'mainFlightNum':
                    utilSearch.getIndexArr(searchInfo.val, 'mainFlightNum')
                    break
                case 'flightRoute':
                    utilSearch.getIndexArr(searchInfo.val, 'flightRoute')
                    break
                case 'flightState':
                    utilSearch.getIndexArr(searchInfo.val, 'flightState')
                    break
            }
        }
    },
    /**
     * 改变td的宽度，拉伸效果
     */
    CHANGE_TH_WIDTH(state, thInfo) {
        console.log(thInfo)
        state.thLeftData[thInfo.index]['width'] = thInfo.tdWidth
        state.thLeftData[(thInfo.index + 1)]['width'] = thInfo.nextTdWidth
    },

    DEL_RIGHT_CONTENT(state, delArr) {
        state.delRightContent = delArr
    },
    SHOW_DATA(state, { showData }) {

        if (showData[0].isChecked) {
            console.log(state.cloneData.contentData)
                // return
        } else {

            let valueArr = []
            let textArr = []
            showData.forEach((item) => {
                if (item.isChecked) {
                    valueArr.push(item.value)
                    textArr.push(item.text)
                }
            })
            if (valueArr.length === 0) {
                return
            }

            let arr = []
            state.thLeftData.forEach(item => {
                if (textArr.indexOf(item.title) >= 0 || item.title === '-') {
                    arr.push(item)
                }
            })
            state.thLeftData = arr

            state.data.contentData.forEach((item, index) => {
                const obj = JSON.parse(JSON.stringify(item))
                state.data.contentData[index] = {}
                for (let i = 0, len = valueArr.length; i < len; i++) {
                    if (obj.hasOwnProperty(valueArr[i])) {
                        state.data.contentData[index][valueArr[i]] = obj[valueArr[i]]
                    }
                }
            })
            console.log(state.thLeftData, state.data.contentData)
        }

    },
    RESET_DATA(state) {
        console.log('11111')
        state.data = {
            contentData: JSON.parse(JSON.stringify(state.cloneData.contentData)),
            fixData: JSON.parse(JSON.stringify(state.cloneData.fixData))
        }
        state.thLeftData = state.cloneLeftData
    }
}