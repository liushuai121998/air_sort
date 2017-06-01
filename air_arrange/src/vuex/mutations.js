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

        let length = state.initData.length
        let randomIndex = Math.round(Math.random() * (length - 1))
        let contentStr = state.cloneMergeData[randomIndex]
        state.initData.push(contentStr)
        state.cloneMergeData.push(contentStr)
        state.serviceData.push(contentStr['services'])

        // 到港数据
        let comeData = state.initData.filter((item) => {
            return item.aOrD === 'A'
        })
        comeData.forEach((item, index) => {
            vm.$set(state.comeData, index, item)
        })

        // 离港数据
        let leaveData = state.initData.filter((item) => {
            return item.aOrD === 'D'
        })
        leaveData.forEach((item, index) => {
            vm.$set(state.leaveData, index, item)
        })
        vm.$set(state.length, "comeLength", state.comeData.length)
        vm.$set(state.length, 'leaveLength', state.leaveData.length)
        vm.$set(state.length, 'mergeLength', state.initData.length)
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
    SORT_TABLE(state, { str, target, param, vm }) {

        // if (Object.is(Number(state.data.contentData[0][1][param]), NaN)) {
        //     if (str === 'leave') {
        //         state.leaveData.sort(function(a, b) {
        //             return target.sort ? a[1][param] > b[1][param] : b[1][param] > a[1][param]
        //         })
        //     } else if (str === 'come') {
        //         state.comeData.sort(function(a, b) {
        //             return target.sort ? a[1][param] > b[1][param] : b[1][param] > a[1][param]
        //         })
        //     } else if (str === 'merge') {

        //     }

        // } else {
        //     // 数字排序 
        //     if (str === 'leave') {
        //         state.leaveData.sort(function(a, b) {
        //             return target.sort ? a[1][param] - b[1][param] : b[1][param] - a[1][param]
        //         })
        //     } else if (str === 'come') {
        //         state.comeData.sort(function(a, b) {
        //             return target.sort ? a[1][param] - b[1][param] : b[1][param] - a[1][param]
        //         })
        //     } else if (str === 'merge') {
        //         state.data.contentData.sort(function(a, b) {
        //             return target.sort ? a[1][param] - b[1][param] : b[1][param] - a[1][param]
        //         })
        //     }

        // }

        // if (param === 'sta') {
        //     let sortData = []
        //     let noSortData = []
        //     state.initData.forEach(function(item, index) {
        //         if (item[param]) {
        //             sortData.push(item)
        //         } else {
        //             noSortData.push(item)
        //         }
        //     })
        //     sortData.sort((a, b) => {
        //             return target.sort ? a[param].slice(11, 16).split(':').join('') - b[param].slice(11, 16).split(':').join('') : b[param].slice(11, 16).split(':').join('') - a[param].slice(11, 16).split(':').join('')
        //         })
        //         // console.log(sortData)
        //     target.sort ? noSortData.concat(sortData).forEach((item, index) => {
        //         vm.$set(state.initData, index, item)
        //     }) : sortData.concat(noSortData).forEach((item, index) => {
        //         vm.$set(state.initData, index, item)
        //     })
        //     console.log(sortData)
        // }

        switch (str) {
            case "merge":
                sortData(state.initData)
                break
            case "come":
                sortData(state.comeData)
                break
            case "leave":
                sortData(state.leaveData)
                break
        }

        function sortData(data) {
            data.sort((a, b) => {
                if (a[param] > b[param]) {
                    return 1;
                } else if (a[param] == b[param]) {

                } else if (a[param] < b[param]) {
                    return -1;
                }
            })
            if (target.sort) {
                data.reverse()
            }
            target.sort = !target.sort
        }

    },

    /**
     * 根据输入框输入的内容重新排序
     */
    UPDATE_TD(state, { inputValue, vm, placeHolderValue }) {
        if (!state.isDiviScreen) {
            dataChange(state.cloneMergeData, state.initData, false)
        } else {

            dataChange(state.cloneComeData, state.comeData, true)
            dataChange(state.cloneLeaveData, state.leaveData, true)
        }

        function dataChange(cloneData, data, isDivi) {
            // 重置数据

            cloneData.forEach((item, index) => {
                //console.log(item['std'])
                vm.$set(data, index, item)
            })

            let arrIndex = []
            let param = ''
            inputValue = inputValue.toUpperCase()
            data.forEach(function(item, index) {
                if (placeHolderValue.search('机型') > 0) {
                    param = 'airType'
                } else if (placeHolderValue.search('时间') > 0) {
                    // 计离
                    param = 'std'

                    let str = item[param]
                    if (!str || str && str.slice(11, 16).split(':').join('').search(inputValue) >= 0) {
                        arrIndex.push(item)
                    }

                } else if (placeHolderValue.search('航班') > 0) {
                    param = 'flightNo'
                } else if (placeHolderValue.search('状态') > 0) {
                    param = 'status'
                } else if (placeHolderValue.search('航线') > 0) {
                    param = 'line'
                } else if (placeHolderValue.search('机号') > 0) {
                    param = 'regNo'
                }

                if (param != 'std' && item[param] && item[param].search(inputValue) >= 0) {
                    arrIndex.push(item)
                }

            })

            data.forEach((item, index, arr) => {

                    if (index <= arrIndex.length - 1) {
                        vm.$set(arr, index, arrIndex[index])
                    } else {
                        arr.splice(index)
                    }


                })
                // 判断是否分屏, 更新数量
            if (isDivi) {
                vm.$set(state.length, "comeLength", state.comeData.length)
                vm.$set(state.length, 'leaveLength', state.leaveData.length)
            } else {
                vm.$set(state.length, 'mergeLength', state.initData.length)
            }

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
    CHANGE_TH_WIDTH(state, { targetIndex, index, widthArr, parentNode, cal, parentWidth, id, vm, parent, targetClassName }) {
        if (!state.isDiviScreen) {
            if (targetClassName === 'qq') {
                vm.$set(state.serviceWidth[targetIndex], 'width', `${widthArr[index]}px`)

            } else {
                vm.$set(state.thLeftData[targetIndex], 'width', `${widthArr[index]}px`)
            }
            parentNode.parentNode.style.width = parentWidth + cal + 'px'
        } else {

            if (parent.className === 'divi_content1') {

                if (targetClassName === 'qq') {
                    vm.$set(state.comeServiceWidth[targetIndex], 'width', `${widthArr[index]}px`)
                } else {
                    vm.$set(state.tabComeData[targetIndex], 'width', `${widthArr[index]}px`)
                }
                parentNode.parentNode.style.width = parentWidth + cal + 'px'
            }
            if (parent.className === 'divi_content2') {
                if (targetClassName === 'qq') {
                    vm.$set(state.leaveServiceWidth[targetIndex], 'width', `${widthArr[index]}px`)
                } else {
                    vm.$set(state.tabLeaveData[targetIndex], 'width', `${widthArr[index]}px`)
                }
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

        if (!state.isDiviScreen) {
            // 分屏
            showDataDetail(state.cloneMergeData, state.initData, state.cloneLeftData, state.thLeftData)
        } else {
            showDataDetail(state.cloneComeData, state.comeData, state.cloneTabComeData, state.tabComeData)
            showDataDetail(state.cloneLeaveData, state.leaveData, state.cloneTabLeaveData, state.tabLeaveData)
        }

        /**
         * 根据需要显示数据
         * @param {*} cloneData 复制的内容区数据
         * @param {*} data 内容区数据
         * @param {*} cloneLeftData 复制的头部数据 
         * @param {*} leftData 头部数据
         */
        function showDataDetail(cloneData, data, cloneLeftData, leftData) {
            // 重置数据
            cloneLeftData.forEach((item, index) => {
                vm.$set(leftData, index, item)
            })

            if (showData[0].isChecked) {
                cloneLeftData.forEach((item, index) => {
                    vm.$set(leftData, index, item)
                })
                cloneData.forEach((item, index) => {
                    vm.$set(data, index, item)
                })
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
                leftData.forEach(item => {
                        if (textArr.indexOf(item.title) >= 0 || item.title === '序号') {
                            arr.push(item)
                        }
                    })
                    // 隐式丢失
                    //leftData = arr
                leftData.forEach((item, index, leftDataArr) => {
                        if (index <= arr.length - 1) {
                            vm.$set(leftData, index, arr[index])
                        } else {
                            leftDataArr.splice(index)
                        }
                    })
                    // console.log(valueArr, leftData)
                const obj = JSON.parse(JSON.stringify(cloneData[0]))

                data.forEach((item, index, arr) => {
                    //state.data.contentData[index][1] = {}
                    vm.$set(arr, index, { flightId: cloneData[index]['flightId'], services: data[index]['services'] })
                    for (let i = 0, len = valueArr.length; i < len; i++) {
                        if (obj.hasOwnProperty(valueArr[i])) {
                            data[index][valueArr[i]] = obj[valueArr[i]]
                        }
                    }
                })
            }
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
    ADD_CLASS(state, { vm, liTargetIndex, index }) {
        let obj = {}
        obj = JSON.parse(JSON.stringify(state.thLeftData[liTargetIndex]))
        obj.class = true
            // state.thLeftData[liTargetIndex].class = true
            // switch (data) {
            //     case state.comeData:
            //         state.comeData[index].push({ class: 'selectLi', classParent: 'selectTr', key })
            //         break
            //     case state.leaveData:
            //         state.leaveData[index].push({ class: 'selectLi', classParent: 'selectTr', key })
            //         break
            //     case state.data.contentData:
            //         state.data.contentData[index].push({ class: 'selectLi', classParent: 'selectTr', key })
            //         break
            // }
        vm.$set(state.thLeftData, liTargetIndex, obj)
        state.initData[index]['class'] = true
    },
    /**
     * 删除class
     * @param {*} state 
     */
    REMOVE_CLASS(state) {
        state.thLeftData.forEach((item, index, arr) => {
            if (item['class']) {
                delete item['class']
            }
        })
        state.initData.forEach(item => {
            if (item['class']) {
                delete item['class']
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
    },
    /**
     * 获取初始化数据
     * @param {*} state 
     * @param {*} vm 
     */
    GET_INIT_DATA(state, vm) {
        vm.$http.post('http://192.168.7.53:8080/getInitData', { "username": 'ghms_admin' }).then((res) => {
            //vm.$http.get('/api/data').then((res) => {
            res.data.d.flight.forEach((item, index) => {
                vm.$set(state.initData, index, item)
            })
            console.log(state.wsUrl)
                // 复制一份初始化数据 
            state.cloneInitData = JSON.parse(JSON.stringify(res.data.d.flight))

            // 到离港合并的数据
            let flightNoArr = [] //航班号 
            state.initData.forEach((item, index) => {
                flightNoArr.push(item['flightNo'])
            })

            // 到港离港的数据
            let mergeData = []
            let saveIndexArr = []
            state.initData.forEach((item, index, arr) => {
                    // console.log(item['operationDate'].slice(0, 10) === item['brotherDate'].slice(0, 10))
                    if (item['operationDate'].slice(0, 10) === item['brotherDate'].slice(0, 10) && item['brother'] != '/') {

                        if (flightNoArr.indexOf(item['brother']) >= 0) {

                            let _index = flightNoArr.indexOf(item['brother'])
                                // 连班
                            saveIndexArr.push(index)
                            if (saveIndexArr.indexOf(_index) < 0) {
                                mergeData.push({ index, _index })
                            }

                        } else {
                            //vm.$set(item, 'flightNo', item["flightNo"] + " / " + item["brother"])
                        }
                    }

                })
                // 整合连班航班数据
            mergeData.forEach((item) => {

                vm.$set(state.initData[item["index"]], 'flightNo', state.initData[item["index"]]['flightNo'] + "/" + state.cloneInitData[item["_index"]]['flightNo'])

            })

            let flagCount = 0
                // 合并
            mergeData.forEach((item, index, arr) => {
                state.initData.splice(item["_index"] - flagCount, 1)
                flagCount++
            })

            // 克隆一份合屏的数据
            state.cloneMergeData = JSON.parse(JSON.stringify(state.initData))


            // 到港数据
            let comeData = JSON.parse(JSON.stringify(state.cloneInitData)).filter((item) => {
                return item.aOrD === 'A'
            })
            comeData.forEach((item, index) => {
                vm.$set(state.comeData, index, item)
            })

            // 离港数据
            let leaveData = JSON.parse(JSON.stringify(state.cloneInitData)).filter((item) => {
                return item.aOrD === 'D'
            })
            leaveData.forEach((item, index) => {
                vm.$set(state.leaveData, index, item)
            })

            // 服务型数据
            state.initData.forEach((item, index) => {
                    // state.serviceData.push(item['services'])
                    vm.$set(state.serviceData, index, item['services'])
                })
                // 服务型数据的width
            state.serviceData[0].forEach((item, index) => {
                    // console.log(item['detailName'])
                    state.serviceWidth.push({ width: '120px' })
                    state.comeServiceWidth.push({ width: '120px' })
                    state.leaveServiceWidth.push({ width: '120px' })
                })
                // 监控到港离港，到离港的数据
            vm.$set(state.length, "comeLength", comeData.length)
            vm.$set(state.length, 'leaveLength', leaveData.length)
            vm.$set(state.length, 'mergeLength', state.initData.length)



            // 复制一份到港数据
            state.cloneComeData = JSON.parse(JSON.stringify(state.comeData))
                // 复制一份离港数据
            state.cloneLeaveData = JSON.parse(JSON.stringify(state.leaveData))

            // 复制一份服务数据
            state.cloneServiceData = JSON.parse(JSON.stringify(state.serviceData))
        })
    },
    SAVE_INDEX(state, { index, targetIndex, vm }) {
        // state.classId = state.initData[index]['flightId']
        // state.classTargetIndex = targetIndex
        vm.$set(state.classInfo, 'id', state.initData[index]['flightId'])
        vm.$set(state.classInfo, 'targetIndex', targetIndex)
            // console.log(state.classId)
    },
    /**
     * 服务数据的按需显示
     * @param {*} state 
     * @param {*} param1 
     */
    SHOW_SERVICE_DATA(state, { serviceDataInfo, vm }) {
        if (!state.isDiviScreen) {
            // 不分屏
            showServiceDataDetail(state.cloneMergeData, state.initData)
        } else {
            showServiceDataDetail(state.cloneComeData, state.comeData)
            showServiceDataDetail(state.cloneLeaveData, state.leaveData)
        }

        function showServiceDataDetail(cloneInitData, initData) {
            cloneInitData.forEach((item, index) => {
                vm.$set(initData[index], 'services', item['services'])
            })

            if (serviceDataInfo[0].isServiceChecked) {

                cloneInitData.forEach((item, index) => {
                    vm.$set(initData[index], 'services', item['services'])
                })
                return

            } else {
                let valueArr = []
                let textArr = []
                serviceDataInfo.forEach((item) => {
                    if (item.isServiceChecked) {
                        textArr.push(item.text)
                    }
                })
                if (textArr.length === 0) {
                    return
                }
                let arrChild = []
                initData[0]['services'].forEach(item => {

                    if (textArr.indexOf(item['detailName']) >= 0) {
                        arrChild.push(item)
                    }

                })

                initData.forEach((item, index, arr) => {
                    vm.$set(item, 'services', arrChild)
                })

            }
        }
        // console.log(state.comeData[0]['services'])
    },
    /**
     * 避免宽度拉伸与排序冲突
     * @param {*} state 
     * @param {*} isSort 
     */
    UPDATE_IS_SORT(state, isSort) {
        state.isSort = isSort
        console.log(state.isSort)
    },

    /**
     * 展现数据
     */
    SHOW_CONTENT(state, { val, vm }) {
        vm.$set(state.isContentShow, 'isShow', true)
        vm.$http.post('http://192.168.7.53:8080/login', { "username": val }).then((res) => {
            // console.log(res.data.d.wsUrl, res.data.d.token)
            vm.$set(state.wsUrl, 'val', res.data.d.wsUrl)
            vm.$set(state.wsUrl, 'token', res.data.d.token)

            // 获得初始化数据之后进行websocket连接
            //ws://ip:port /ws?dev=web&token=token
            if (state.wsUrl.val) {
                let ws = new WebSocket('ws://' + state.wsUrl.val + '/ws?dev=web&token=' + state.wsUrl.token)
                    //let ws = new WebSocket('ws://172.168.7.53:13')
                ws.onopen = function() {
                    console.log('opening......')
                }

                ws.onmessage = function(e) {
                    //console.log(e)
                    alert('eee')
                };
            }

        })

    }
}