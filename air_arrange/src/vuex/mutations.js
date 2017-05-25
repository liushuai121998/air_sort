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
    ADD_DATA(state, vm) {
        let length = state.data.contentData.length
        let randomIndex = Math.round(Math.random() * (length - 1))
        let contentStr = state.data.contentData[randomIndex]
            //let cloneContentStr = state.cloneData.contentData[randomIndex]
        state.data.contentData.push(contentStr)
        state.cloneData.contentData.push(contentStr)

        // let comeData = state.data.contentData.filter((item) => {
        //     return (item[0].continue && item[0].continue.arrival) || item[0].arrival
        // })
        // comeData.forEach((item, index) => {
        //     vm.$set(state.comeData, index, item)
        // })
        // let leaveData = state.data.contentData.filter((item) => {
        //     return (item[0].continue && item[0].continue.departed) || item[0].departed
        // })
        // leaveData.forEach((item, index) => {
        //     vm.$set(state.leaveData, index, item)
        // })
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
    // DELETE_DATA(state) {
    //     // 将检索到的数据删除
    //     let flag = 0
    //     let cloneData = [].concat(state.data.contentData)
    //     let cloneIndex = [].concat(state.selectIndexArr)
    //     let selectData = []
    //     let isClick = true

    //     cloneIndex.forEach((item, index) => {
    //         selectData.push(state.data.contentData[item])
    //     })

    //     state.searchData.forEach((item, index) => {
    //         // 检索并选中该tr才删除
    //         if (selectData.indexOf(item) >= 0) {
    //             isClick = false
    //             state.data.contentData.splice(cloneData.indexOf(item) - flag, 1)
    //             flag++
    //         }
    //     })

    //     // 将选中tr的删除 删除之后selectTr这个类名还在
    //     state.selectTrArr.forEach((item, index) => {
    //         item.classList.remove('selectTr')
    //     })
    //     let indexFlag = 0
    //         // console.log(state.selectIndexArr)
    //         // 将索引进行排序state.selectIndexArr.sort()
    //     state.selectIndexArr.sort().forEach(function(item, index) {
    //         if (isClick) {
    //             state.data.contentData.splice(item - indexFlag, 1)
    //             console.log(item, "++", index)
    //             indexFlag++
    //         }
    //     });
    //     // 点击删除按钮之后将selectIndexArr 置为空数组
    //     state.selectIndexArr = []
    //     state.selectTrArr = []
    // },
    DELETE_DATA(state, vm) {
        let length = state.data.contentData.length
        let randomIndex = Math.round(Math.random() * (length - 1))
        state.data.contentData.splice(randomIndex, 1)
        state.cloneData.contentData.splice(randomIndex, 1)

        // let comeData = state.data.contentData.filter((item) => {
        //     return (item[0].continue && item[0].continue.arrival) || item[0].arrival
        // })
        // comeData.forEach((item, index) => {
        //     vm.$set(state.comeData, index, item)
        //     vm.$set(state.cloneComeData, index, item)
        // })
        // let leaveData = state.data.contentData.filter((item) => {
        //     return (item[0].continue && item[0].continue.departed) || item[0].departed
        // })
        // leaveData.forEach((item, index) => {
        //     vm.$set(state.leaveData, index, item)
        //     vm.$set(state.cloneLeaveData, index, item)
        // })
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
    SORT_TABLE(state, { param, str, target }) {

        if (Object.is(Number(state.data.contentData[0][1][param]), NaN)) {
            if (str === 'leave') {
                state.leaveData.sort(function(a, b) {
                    return target.sort ? a[1][param] > b[1][param] : b[1][param] > a[1][param]
                })
            } else if (str === 'come') {
                state.comeData.sort(function(a, b) {
                    return target.sort ? a[1][param] > b[1][param] : b[1][param] > a[1][param]
                })
            } else if (str === 'merge') {
                state.data.contentData.sort(function(a, b) {
                    // 字母数字排序
                    return target.sort ? a[1][param] > b[1][param] : b[1][param] > a[1][param]
                })
            }

        } else {
            // 数字排序 
            if (str === 'leave') {
                state.leaveData.sort(function(a, b) {
                    return target.sort ? a[1][param] - b[1][param] : b[1][param] - a[1][param]
                })
            } else if (str === 'come') {
                state.comeData.sort(function(a, b) {
                    return target.sort ? a[1][param] - b[1][param] : b[1][param] - a[1][param]
                })
            } else if (str === 'merge') {
                state.data.contentData.sort(function(a, b) {
                    return target.sort ? a[1][param] - b[1][param] : b[1][param] - a[1][param]
                })
            }

        }

        target.sort = !target.sort

    },

    /**
     * 根据输入框输入的内容重新排序
     */
    UPDATE_TD(state, { inputValue, vm, placeHolderValue }) {
        // state.searchData = []
        if (!state.isDiviScreen) {
            dataChange(state.cloneData.contentData, state.data.contentData)
        } else {

            dataChange(state.cloneComeData, state.comeData)
            dataChange(state.cloneLeaveData, state.leaveData)
        }

        function dataChange(cloneData, data) {
            cloneData.forEach((item, index) => {
                vm.$set(data, index, item)
            })
            let arrIndex = []
            let param = ''
                // console.log(inputValue.toUpperCase())
            inputValue = inputValue.toUpperCase()
            data.forEach(function(item, index) {
                if (placeHolderValue.search('机位') > 0) {
                    param = 'airPos'
                } else if (placeHolderValue.search('时间') > 0) {
                    param = 'calLeave'
                } else if (placeHolderValue.search('航班') > 0) {
                    param = 'mainFlightNum'
                } else if (placeHolderValue.search('状态') > 0) {
                    param = 'flightState'
                } else if (placeHolderValue.search('航线') > 0) {
                    param = 'flightRoute'
                } else if (placeHolderValue.search('机号') > 0) {
                    param = 'airplaneNum'
                }

                if (item[1][param].search(inputValue) >= 0) {
                    arrIndex.push(item)
                }
            })

            arrIndex.forEach(function(item) {
                // arr.splice(start, end) 返回一个数组保存的是删除的项
                // arr.unshift() 在数组的最前面添加
                // 把删除的项放到最前面
                // state.data.contentData.unshift(state.data.contentData.splice(item, 1)[0])
                // state.searchData.unshift(state.data.contentData[0])
            })
            data.forEach((item, index, arr) => {
                if (index <= arrIndex.length - 1) {
                    vm.$set(arr, index, arrIndex[index])
                } else {
                    arr.splice(index)
                }
            })
        }

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
                    if (item[1][param] != val[0]) {
                        indexArr.push(index)
                    }
                })
                this.spliceData(indexArr)
            },
            spliceData(indexArr) {
                let flag = 0
                indexArr.forEach((item) => {
                    state.data.contentData.splice(item - flag, 1)
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
                            if (item[1]['airPos'] < searchInfo.val[0] || item[1]['airPos'] > searchInfo.val[1]) {
                                indexArr.push(index)
                            }
                        })
                        utilSearch.spliceData(indexArr)
                            // 检索到之后排序
                        state.data.contentData.sort((a, b) => {
                            return a[1]['airPos'] - b[1]['airPos']
                        })


                    } else if (searchInfo.val.length > 1) {
                        let indexArr = []
                        console.log(searchInfo.val)
                        state.data.contentData.forEach((item, index) => {
                            if (item[1]['airPos'] != searchInfo.val[0] || item[1]['airPos'] != searchInfo.val[1]) {
                                indexArr.push(index)
                            }
                        })
                        utilSearch.spliceData(indexArr)
                    } else {

                        let indexArr = []
                        console.log(searchInfo.val)
                        state.data.contentData.forEach((item, index) => {
                            if (item[1]['airPos'] != searchInfo.val[0]) {
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
                            if (item[1]['calCome'] < searchInfo.val[0].split(':').join('') || item[1]['calCome'] > searchInfo.val[1].split(':').join('')) {
                                indexArr.push(index)
                            }
                        })
                        utilSearch.spliceData(indexArr)
                            // 检索到之后排序
                        state.data.contentData.sort((a, b) => {
                            return a[1]['calCome'] - b[1]['calCome']
                        })
                    } else {
                        let indexArr = []
                        state.data.contentData.forEach((item, index) => {
                            if (item[1]['calCome'] != searchInfo.val[0].split(':').join('')) {
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
    CHANGE_TH_WIDTH(state, { targetIndex, index, widthArr, parentNode, cal, parentWidth, id, vm, parent }) {
        // widthArr.forEach((item, i) => {
        //         // let width = (item / (parentWidth + cal)) * 100 + '%'
        //         let width = item + 'px'
        //         switch (id) {
        //             case 'tabCome':
        //                 vm.$set(state.tabComeData[i], 'width', width)
        //                 break
        //             case 'tabLeave':
        //                 vm.$set(state.tabLeaveData[i], 'width', width)
        //                 break
        //             case 'tab':
        //                 vm.$set(state.thLeftData[i], 'width', width)
        //                 break
        //         }

        //     })
        // parentNode.parentNode.nextElementSibling.style.width = ((parentWidth + cal) / parentNode.parentNode.parentNode.offsetWidth) * 100 + '%'
        // parentNode.parentNode.style.width = ((parentWidth + cal) / parentNode.parentNode.parentNode.offsetWidth) * 100 + '%'
        if (!state.isDiviScreen) {
            vm.$set(state.thLeftData[targetIndex], 'width', `${widthArr[index]}px`)
            parentNode.parentNode.style.width = parentWidth + cal + 'px'
        } else {
            console.log(parent.className)
            if (parent.className === 'divi_content1') {
                vm.$set(state.tabComeData[targetIndex], 'width', `${widthArr[index]}px`)
                parentNode.parentNode.style.width = parentWidth + cal + 'px'
            }
            if (parent.className === 'divi_content2') {
                vm.$set(state.tabLeaveData[targetIndex], 'width', `${widthArr[index]}px`)
                parentNode.parentNode.style.width = parentWidth + cal + 'px'
            }
        }
    },
    DEL_RIGHT_CONTENT(state, delArr) {
        state.delRightContent = delArr
    },
    /**
     * 按需显示数据
     * @param {*} state 
     * @param {*} param1 
     */
    SHOW_DATA(state, { showData, vm }) {
        // 重置数据
        state.cloneLeftData.forEach((item, index) => {
            vm.$set(state.thLeftData, index, item)
        })

        if (showData[0].isChecked) {
            state.isBai = false
            state.cloneLeftData.forEach((item, index) => {
                    vm.$set(state.thLeftData, index, item)
                })
                // state.cloneData.contentData.forEach((item, index) => {
                //     vm.$set(state.data.contentData, index, item)
                // })
            return
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
            if (arr.length <= 15) {
                state.isBai = true
            }
            arr.forEach((item, index) => {
                item.width = (100 / (arr.length)) + '%'
            })
            state.thLeftData = arr
            console.log(valueArr)
            const obj = JSON.parse(JSON.stringify(state.cloneData.contentData[0][1]))

            state.data.contentData.forEach((item, index, arr) => {
                //state.data.contentData[index][1] = {}
                vm.$set(arr[index], 1, {})
                for (let i = 0, len = valueArr.length; i < len; i++) {
                    if (obj.hasOwnProperty(valueArr[i])) {
                        state.data.contentData[index][1][valueArr[i]] = obj[valueArr[i]]
                    }
                }
            })

        }

    },
    /**
     * 航控排序
     * @param {*} state 
     */
    FLY_CONTROL_SORT(state, vm) {
        // 第一类
        let arr1 = []
            // 第二类
        let arr2 = []
            // 弟三类
        let arr3 = []
            // 第四类
        let arr4 = []
            // 第五类
        let arr5 = []
            // 第六类
        let arr6 = []
            // 第7类
        let arr7 = []
            // 第八类
        let arr8 = []
        state.data.contentData.forEach((item, index) => {
                if ((item[0].continue && item[0].continue.departed && item[0].continue.departed.isRealFlight === 'false' && item[0].continue.departed.isDelay === 'true') || item[0].departed && item[0].departed.isRealFlight === 'false' && item[0].departed.isDelay === 'true') {
                    arr1.push(item)
                } else if (item[0].continue && item[0].continue.departed && item[0].continue.departed.isRealFlight === 'false' && item[0].continue.departed.time >= 30) {
                    arr2.push(item)
                } else if ((item[0].continue && item[0].continue.departed && (item[0].continue.departed.urgingBoarding === 'true' || item[0].continue.departed.boardingEnd === 'true') && item[0].continue.departed.isRealFlight === 'false') || (item[0].departed && item[0].departed.isRealFlight === 'false' && (item[0].departed.urgingBoarding === 'true' || item[0].departed.boardingEnd === 'true'))) {
                    arr3.push(item)
                } else if ((item[0].continue && item[0].continue.departed && item[0].continue.arrival && item[0].continue.departed.isRealFlight === 'false' && item[0].continue.arrival.time >= 0) || item[0].departed && item[0].departed.isRealFlight === 'false') {
                    arr4.push(item)
                } else if ((item[0].continue && item[0].continue.departed && item[0].continue.arrival && item[0].continue.departed.isRealFlight === 'false' && item[0].continue.arrival.isRealCome === 'false' && item[0].continue.arrival.isFlighted === 'true') || item[0].arrival && item[0].arrival.isRealCome === 'false' && item[0].arrival.isFlighted === 'true') {
                    arr5.push(item)
                } else if ((item[0].continue && item[0].continue.departed && item[0].continue.arrival && (item[0].continue.departed.cancelledFlight === 'true') && (item[0].continue.arrival.cancelledFlight === 'true')) || (item[0].arrival && item[0].arrival.cancelledFlight === 'true' || (item[0].departed && item[0].departed.cancelledFlight === 'true'))) {
                    arr8.push(item)
                } else if (item[0].arrival && item[0].arrival.isRealCome === 'true' && item[0].arrival.isFlighted === 'true') {
                    arr7.push(item)
                } else {
                    arr6.push(item)
                }

            })
            // console.log(arr1, arr2, arr3, arr4, arr5, arr7, arr8, arr6)
        arr1 && arr1.sort((a, b) => {
            return a[1]['calLeave'] > b[1]['calLeave']
        })
        arr2 && arr2.sort((a, b) => {

            return a[1]['calLeave'] > b[1]['calLeave']
        })
        arr3 && arr3.sort((a, b) => {
            return a[1]['calLeave'] > b[1]['calLeave']
        })
        arr4 && arr4.sort((a, b) => {

            return a[1]['calLeave'] > b[1]['calLeave']
        })
        arr5 && arr5.sort((a, b) => {

            return a[1]['calLeave'] > b[1]['calLeave']
        })
        arr6 && arr6.sort((a, b) => {

            return a[1]['calLeave'] > b[1]['calLeave']
        })

        arr7 && arr7.sort((a, b) => {

            return a[1]['calLeave'] > b[1]['calLeave']
        })

        arr8 && arr8.sort((a, b) => {
            return a[1]['calLeave'] > b[1]['calLeave']
        })

        arr1.forEach((item) => {
            item[0].id = 1
        })
        arr2.forEach((item) => {
            item[0].id = 2
        })
        arr3.forEach((item) => {
            item[0].id = 3
        })
        arr4.forEach((item) => {
            item[0].id = 4
        })
        arr5.forEach((item) => {
            item[0].id = 5
        })
        arr6.forEach((item) => {
            item[0].id = 6
        })
        arr7.forEach((item) => {
            item[0].id = 7
        })
        arr8.forEach((item) => {
            item[0].id = 8
        })

        arr1.push(...arr2, ...arr3, ...arr4, ...arr5, ...arr6, ...arr7, ...arr8)

        arr1.forEach((item, index) => {
            // 使用vm.$set()改变数组的值才能触发页面更新

            vm.$set(state.data.contentData, index, item)

        })
    },
    // 更新是否分屏显示的状态
    UPDATE_DIVISCREEN(state, val) {
        state.isDiviScreen = val
    },
    /**
     * 添加class
     * @param {*} state 
     * @param {*} param1 
     */
    ADD_CLASS(state, { data, index, key }) {

        switch (data) {
            case state.comeData:
                state.comeData[index].push({ class: 'selectLi', classParent: 'selectTr', key })
                break
            case state.leaveData:
                state.leaveData[index].push({ class: 'selectLi', classParent: 'selectTr', key })
                break
            case state.data.contentData:
                state.data.contentData[index].push({ class: 'selectLi', classParent: 'selectTr', key })
                break
        }

    },
    /**
     * 删除class
     * @param {*} state 
     */
    REMOVE_CLASS(state) {
        state.comeData.forEach(item => {
            if (item[3]) {
                item.splice(3, 1)
            }
        })
        state.leaveData.forEach(item => {
            if (item[3]) {
                item.splice(3, 1)
            }
        })
        state.data.contentData.forEach(item => {
            if (item[3]) {
                item.splice(3, 1)
            }
        })
    },
    /**
     * 显示/隐藏rightContent
     * @param {*} state 
     * @param {*} isShowRight 
     */
    SHOW_HIDDEN_RIGHT(state, isShowRight) {
        state.isShowRight = isShowRight
    },
    RIGHT_CONTENT(state, { vm, rightContent }) {
        state.rightContent = rightContent
    }
}