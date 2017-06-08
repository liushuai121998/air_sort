import Base64 from '../utils/base64.js'

export default {
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

        if (placeHolderValue.search('时间') > 0) {
            return
        }

        if (!state.isDiviScreen) {
            dataChange(state.cloneMergeData, state.initData, false)
        } else {
            dataChange(state.cloneComeData, state.comeData, true)
            dataChange(state.cloneLeaveData, state.leaveData, true)
        }

        function dataChange(cloneData, data, isDivi) {
            // console.log(cloneData === state.cloneMergeData, data === state.initData)
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
                    if (item[param] && item[param].search(inputValue) >= 0) {
                        arrIndex.push(item)
                    }

                } // else //if (placeHolderValue.search('时间') > 0) {

                //return
                // 时间或时间段模糊搜索
                // param = 'std' //'std' 'etd' 'atd' 'sta' 'eta' 'ata' 服务部分 'planTime' 'actualTime'
                // let paramObj = {
                //         flight: ['std', 'etd', 'atd', 'sta', 'eta', 'ata'],
                //         services: ['planTime', 'actualTime']
                //     }
                // 时间段搜索
                // if (inputValue.indexOf('-') > 0) {
                //     inputValue = inputValue.split('-') // 数组
                //     console.log(inputValue)
                // }
                // 航班部分
                // paramObj.flight.forEach((paramItem, index) => {

                //         let str = item[paramItem]
                //         if (str && str != '/' && str.slice(11, 16).split(':').join('').search(inputValue) >= 0) {
                //             arrIndex.push(item)
                //         }

                //     })
                //     // 服务部分
                // paramObj.services.forEach((paramItem, index) => {
                //     // 服务部分的数据
                //     item['services'].forEach((serviceItem) => {
                //         let str = serviceItem[paramItem]
                //         if (str && str != '/' && str.search(inputValue) >= 0) {
                //             if (arrIndex.indexOf(item) < 0) {
                //                 arrIndex.push(item)
                //             }
                //         }
                //     })
                // })
                //}
                else if (placeHolderValue.search('航班') > 0) {
                    param = 'flightNo'
                    if (item[param] && item[param].search(inputValue) >= 0) {
                        arrIndex.push(item)
                    }
                } else if (placeHolderValue.search('状态') > 0) {
                    param = 'status'
                    if (item[param] && item[param].search(inputValue) >= 0) {
                        arrIndex.push(item)
                    }
                } else if (placeHolderValue.search('航线') > 0) {
                    param = 'line'
                    if (item[param] && item[param].search(inputValue) >= 0) {
                        arrIndex.push(item)
                    }
                } else if (placeHolderValue.search('机号') > 0) {
                    param = 'regNo'
                    if (item[param] && item[param].search(inputValue) >= 0) {
                        arrIndex.push(item)
                    }
                }

            })
            data.forEach((item, index, arr) => {

                if (index <= arrIndex.length - 1) {
                    vm.$set(arr, index, arrIndex[index])
                } else {
                    arr.splice(index)
                }

            })
            state.cloneMergeData3 = JSON.parse(JSON.stringify(data))
            state.cloneComeData3 = JSON.parse(JSON.stringify(data))
            state.cloneLeaveData3 = JSON.parse(JSON.stringify(data))
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
     * 时间段搜索
     */
    SEARCH(state, { inputValue, vm, placeHolderValue }) {
        if (!state.isDiviScreen) {
            timeSearch(state.cloneMergeData, state.initData, false)
        } else {

            timeSearch(state.cloneComeData, state.comeData, true)
            timeSearch(state.cloneLeaveData, state.leaveData, true)
        }
        // 时间段搜索
        function timeSearch(cloneData, data, isDivi) {
            // 重置数据
            cloneData.forEach((item, index) => {
                //console.log(item['std'])
                vm.$set(data, index, item)
            })

            if (placeHolderValue.search('时间') > 0) {
                // 时间或时间段模糊搜索
                // param = 'std' //'std' 'etd' 'atd' 'sta' 'eta' 'ata' 服务部分 'planTime' 'actualTime'
                let paramObj = {
                        flight: ['std', 'etd', 'atd', 'sta', 'eta', 'ata'],
                        services: ['planTime', 'actualTime']
                    }
                    // 时间段搜索
                if (inputValue.indexOf('-') > 0) {
                    inputValue = inputValue.split('-') // 数组
                }
                let arrIndex = []
                data.forEach((item, index) => {
                        // 航班部分
                        paramObj.flight.forEach((paramItem, index) => {

                                let str = item[paramItem]
                                if (str && str != '/' && Number(str.slice(11, 16).split(':').join('')) >= Number(inputValue[0]) && Number(str.slice(11, 16).split(':').join('')) <= Number(inputValue[1])) {
                                    arrIndex.push(item)
                                }

                            })
                            // 服务部分
                        paramObj.services.forEach((paramItem, index) => {
                            // 服务部分的数据
                            item['services'].forEach((serviceItem) => {
                                let str = serviceItem[paramItem]
                                if (str && str != '/' && str && str != '/' && Number(str.slice(11, 16).split(':').join('')) >= Number(inputValue[0]) && Number(str.slice(11, 16).split(':').join('')) <= Number(inputValue[1])) {
                                    if (arrIndex.indexOf(item) < 0) {
                                        arrIndex.push(item)
                                    }
                                }
                            })
                        })
                    })
                    // 保留
                data.forEach((item, index, arr) => {
                    if (index <= arrIndex.length - 1) {
                        vm.$set(arr, index, arrIndex[index])
                    } else {
                        arr.splice(index)
                    }

                })
            }

            // 判断是否分屏, 更新数量
            if (isDivi) {
                vm.$set(state.length, "comeLength", state.comeData.length)
                vm.$set(state.length, 'leaveLength', state.leaveData.length)
            } else {
                vm.$set(state.length, 'mergeLength', state.initData.length)
            }
        }
    },
    /**
     * 改变td的宽度，拉伸效果
     */
    CHANGE_TH_WIDTH(state, { targetIndex, index, widthArr, parentNode, cal, parentWidth, vm, parent, targetClassName }) {
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
            console.log(cloneData[0])
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

                leftData.forEach((item, index, leftDataArr) => {
                    if (index <= arr.length - 1) {
                        vm.$set(leftData, index, arr[index])
                    } else {
                        leftDataArr.splice(index)
                    }
                })

                data.forEach((item, index, arr) => {
                    const obj = JSON.parse(JSON.stringify(cloneData[index]))
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
        //vm.$http.post('http://192.168.7.53:8080/getInitData', { "username": 'ghms_admin' }).then((res) => {
        vm.$http.get('/api/data').then((res) => {
            let names = Object.keys(res.data.data.d.flight[0])
            res.data.data.d.flight.forEach((item, index) => {
                    if (!item['mark'].trim()) {
                        vm.$set(item, 'mark', '/')
                    }

                    vm.$set(state.initData, index, item)
                    state.flightIdArr.push(item.flightId)
                })
                // 复制一份初始化数据 
            state.cloneInitData = JSON.parse(JSON.stringify(res.data.data.d.flight))

            // 权限数据
            state.authData = res.data.data.d.Auth
                // 到离港合并的数据
            let flightNoArr = [] //航班号 
            state.initData.forEach((item, index) => {
                flightNoArr.push(item['flightNo'])
            })

            // 到港离港的数据
            let mergeData = []

            state.initData.forEach((item, index, arr) => {
                // console.log(item['operationDate'].slice(0, 10) === item['brotherDate'].slice(0, 10))
                if (item['operationDate'].slice(0, 10) === item['brotherDate'].slice(0, 10) && item['brother'] != '/') {

                    if (flightNoArr.indexOf(item['brother']) >= 0) {

                        let _index = flightNoArr.indexOf(item['brother'])
                            // 连班
                        if (item['aOrD'] === 'A') {
                            // 到港
                            // index 到港 _index 离港
                            mergeData.push({ index, _index })
                        }

                    }
                }

            })


            // 整合连班航班数据
            mergeData.forEach((item) => {

                vm.$set(state.initData[item["index"]], 'flightNo', state.initData[item["index"]]['flightNo'] + " / " + state.cloneInitData[item["_index"]]['flightNo'])
                vm.$set(state.initData[item['index']], 'repeatCount', state.initData[item['index']]['repeatCount'] + ' / ' + state.cloneInitData[item['_index']]['repeatCount'])
                vm.$set(state.initData[item['index']], 'regNo', state.initData[item['index']]['regNo'] + ' / ' + state.cloneInitData[item['_index']]['regNo'])
                    // 航班id
                vm.$set(state.initData[item['index']], 'flightId', state.initData[item['index']]['flightId'] + ' / ' + state.cloneInitData[item['_index']]['flightId'])

                if (state.initData[item['index']]['dori'] != state.cloneInitData[item['_index']]['dori']) {
                    vm.$set(state.initData[item['index']], 'dori', state.initData[item['index']]['dori'] + ' / ' + state.cloneInitData[item['_index']]['dori'])
                }
                if (state.initData[item['index']]['airType'] != state.cloneInitData[item['_index']]['airType']) {
                    vm.$set(state.initData[item['index']], 'airType', state.initData[item['index']]['airType'] + ' / ' + state.cloneInitData[item['_index']]['airType'])
                }
                if (state.initData[item['index']]['status'] != state.cloneInitData[item['_index']]['status']) {
                    vm.$set(state.initData[item['index']], 'status', state.initData[item['index']]['status'] + ' / ' + state.cloneInitData[item['_index']]['status'])
                }
                if (state.initData[item['index']]['vip'] != state.cloneInitData[item['_index']]['vip']) {
                    vm.$set(state.initData[item['index']], 'vip', state.initData[item['index']]['vip'] + ' / ' + state.cloneInitData[item['_index']]['vip'])
                }
                // 离
                vm.$set(state.initData[item['index']], 'etd', state.cloneInitData[item['_index']]['etd'])
                vm.$set(state.initData[item['index']], 'std', state.cloneInitData[item['_index']]['std'])
                vm.$set(state.initData[item['index']], 'atd', state.cloneInitData[item['_index']]['atd'])

                // 服务部分合并
                state.initData[item['index']]['services'].forEach((el, index, arr) => {
                    if (el['planTime'] === '/') {
                        vm.$set(arr[index], 'planTime', state.cloneInitData[item['_index']]['services'][index]['planTime'])
                    }
                    if (el['actualTime'] === '/') {
                        vm.$set(arr[index], 'actualTime', state.cloneInitData[item['_index']]['services'][index]['actualTime'])
                    }
                })

            })

            let flagCount = 0
                // 合并
            mergeData.forEach((item, index, arr) => {

                state.initData.splice(item["_index"] - flagCount, 1)
                flagCount++

            })


            // 克隆一份合屏的数据
            state.cloneMergeData = JSON.parse(JSON.stringify(state.initData))
                // state.cloneMergeData.forEach((item, index) => {

            //     })
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
        console.log(state.cloneMergeData[0]['services'])
        if (!state.isDiviScreen) {
            let cloneData = JSON.parse(JSON.stringify(state.cloneMergeData))
            showServiceDataDetail(cloneData, state.initData)
        } else {
            showServiceDataDetail(state.cloneComeData, state.comeData)
            showServiceDataDetail(state.cloneLeaveData, state.leaveData)

        }

        function showServiceDataDetail(cloneInitData, initData) {
            console.log(cloneInitData[0]['services'])
            cloneInitData.forEach((item, index) => {
                vm.$set(initData, index, item)
            })

            if (serviceDataInfo[0].isServiceChecked) {

                // cloneInitData.forEach((item, index) => {
                //     vm.$set(initData, index, item)
                // })

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

                // 二位数组保存
                let arrParent = []
                initData.forEach(item => {
                    let arrChild = []
                    item['services'].forEach((serviceItem, index) => {
                        if (textArr.indexOf(serviceItem['detailName']) >= 0) {
                            arrChild.push(serviceItem)
                        }
                    })
                    arrParent.push(arrChild)
                })

                initData.forEach((item, index, arr) => {
                    vm.$set(item, 'services', arrParent[index])
                })

                // state.cloneMergeData2 = JSON.parse(JSON.stringify(initData))
                // state.cloneComeData2 = JSON.parse(JSON.stringify(initData))
                // state.cloneLeaveData2 = JSON.parse(JSON.stringify(initData))

            }
        }


        // 判断是否分屏, 更新数量
        if (state.isDiviScreen) {
            vm.$set(state.length, "comeLength", state.comeData.length)
            vm.$set(state.length, 'leaveLength', state.leaveData.length)
        } else {
            vm.$set(state.length, 'mergeLength', state.initData.length)
        }


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
     * 展现数据 建立websocket链接
     */
    SHOW_CONTENT(state, { val, vm }) {
        vm.$set(state.isContentShow, 'isShow', true)
        state.username = val
        vm.$http.post('http://192.168.7.53:8080/login', { "username": val }).then((res) => {
            // console.log(res.data)
            vm.$set(state.wsUrl, 'val', res.data.d.wsUrl)
            vm.$set(state.wsUrl, 'token', res.data.d.token)

            // 获得初始化数据之后进行websocket连接
            //ws://ip:port /ws?dev=web&token=token
            if (state.wsUrl.val) {
                let ws = new WebSocket('ws://' + state.wsUrl.val + '/ws?dev=web&token=' + state.wsUrl.token)
                    //let ws = new WebSocket('ws://172.168.7.53:13')
                console.log('ws://' + state.wsUrl.val + '/ws?dev=web&token=' + state.wsUrl.token)
                ws.onopen = function() {
                    console.log('opening......')
                }

                ws.onmessage = function(e) {

                    serviceDataUpdate(e.data)

                };

                ws.onerror = function() {
                    alert('error')
                }

                ws.onclose = function() {
                    console.log('closing')
                }
            }

        })

        // 提交服务
        function serviceDataUpdate(data) {
            // 提交服务
            let base = new Base64()
            let result = base.decode(JSON.parse(data).body)
            console.log(JSON.parse(result))
            result = JSON.parse(result)
                // 将接受到的时间戳转化
            let date = new Date(Number(result.time))
            let hour = date.getHours()
            hour = hour < 10 ? '0' + hour : hour
            let minute = date.getMinutes()
            minute = minute < 10 ? '0' + minute : minute
            console.log(hour, minute)
            let time = hour + '' + minute
                // 改变时间
            switch (state.updateFlightInfo.str) {
                case 'tdData':
                    // 到离港
                    vm.$set(state.initData[state.updateFlightInfo.index]['services'][state.updateFlightInfo.clickServiceIndex], 'actualTime', time)
                    break
                case 'comeData':
                    // 到港
                    vm.$set(state.comeData[state.updateFlightInfo.index]['services'][state.updateFlightInfo.clickServiceIndex], 'actualTime', time)
                    break

                case 'leaveData':
                    // 离港
                    console.log(state.updateFlightInfo.index)
                    vm.$set(state.leaveData[state.updateFlightInfo.index]['services'][state.updateFlightInfo.clickServiceIndex], 'actualTime', time)
                    break
            }

        }
    },
    /**
     * 取消发布时间
     * @param {*} stata 
     * @param {*} param1 
     */
    CANCEL_TIME(state, { vm }) {

        switch (state.updateFlightInfo.str) {
            case 'tdData':
                // 到离港
                vm.$set(state.initData[state.updateFlightInfo.index]['services'][state.updateFlightInfo.clickServiceIndex], 'actualTime', '/')
                break
            case 'comeData':
                // 到港
                vm.$set(state.comeData[state.updateFlightInfo.index]['services'][state.updateFlightInfo.clickServiceIndex], 'actualTime', '/')
                break

            case 'leaveData':
                // 离港
                vm.$set(state.leaveData[state.updateFlightInfo.index]['services'][state.updateFlightInfo.clickServiceIndex], 'actualTime', '/')
                break
        }
    },
    UPDATE_FLIGHT_ACTU_TIME(state, { clickServiceIndex, index, str, vm }) {
        vm.$set(state.updateFlightInfo, 'clickServiceIndex', clickServiceIndex)
        vm.$set(state.updateFlightInfo, 'index', index)
        vm.$set(state.updateFlightInfo, 'str', str)
    },
    /**
     * 保存当前的时间作为参数发送后台
     * @param {*} state 
     * @param {*} param1 
     */
    UPDATE_TIME(state, { vm, time }) {
        state.updateTime = time
    },
    /**
     * 是否需要获取时间参数
     * @param {*} state 
     * @param {*} param1 
     */
    IS_GET_PARAM_TIME(state, { vm, isGet }) {
        state.isGetParamTime = isGet
    },
    /**
     * 重置检索后的数据。当select发生变化时
     * @param {*} state 
     * @param {*} param1 
     */
    RESET_DATA_SEARCH(state, { vm }) {
        if (state.isDiviScreen) {
            state.cloneComeData.forEach((item, index) => {
                vm.$set(state.comeData, index, item)
            })
            state.cloneLeaveData.forEach((item, index) => {
                vm.$set(state.leaveData, index, item)
            })
        } else {
            state.cloneMergeData.forEach((item, index) => {
                vm.$set(state.initData, index, item)
            })
        }
    },
    /**
     * 模拟航班信息的更新
     * 1.航班预计到达时间变更事件
     * 2.航班预计起飞时间变更事件
     * 3.航班到达事件
     * 4.航班离港事件
     * 5.新增航班事件
     * 
     * @param {*} state 
     * @param {*} param1 
     */
    FLIGHT_INFO_UPDATE(state, { data, vm }) {
        // 新增航班事件
        // 到离港合并的数据
        let randomIndex = Math.round(Math.random() * (data.time.length - 1))

        if (typeof(data.time[randomIndex].value) === 'object') {

            state.initData.push(data.time[randomIndex].value)
            if (data.time[randomIndex].value.aOrD === 'A') {

                state.comeData.push(data.time[randomIndex].value)
            } else {

                state.leaveData.push(data.time[randomIndex].value)
            }
            vm.$set(state.flightUpdateInfo, 'val', '新增航班' + data.time[randomIndex].value.flightNo)

            vm.$set(state.length, "comeLength", state.comeData.length)
            vm.$set(state.length, 'leaveLength', state.leaveData.length)
            vm.$set(state.length, 'mergeLength', state.initData.length)

        } else {
            updateInitData(state.initData, state.comeData, state.leaveData)
            updateInitData(state.cloneMergeData, state.cloneComeData, state.cloneLeaveData)

            function updateInitData(initData, comeData, leaveData) {
                // 到离港
                initData.forEach((item, index) => {
                    // console.log(typeof data.time[randomIndex].flightId) // number
                    if (item.flightId.indexOf(data.time[randomIndex].flightId.toString()) >= 0) { // == 类型转换
                        let type = data.time[randomIndex].type.toLowerCase()
                        console.log('进入判断')
                        if (item[type] === data.time[randomIndex].value) {
                            return
                        }
                        vm.$set(item, type, data.time[randomIndex].value)
                            //state.flightUpdateInfo = '航班' + item.flightNo + type + '发生变更'
                        vm.$set(state.flightUpdateInfo, 'val', '航班' + item.flightNo + data.time[randomIndex].msg)
                        return
                    }

                })

                // 到港数据
                comeData.forEach((item, index) => {
                        if (item.flightId.indexOf(data.time[randomIndex].flightId.toString()) >= 0) {
                            let type = data.time[randomIndex].type.toLowerCase()
                            console.log('进入判断')
                            if (item[type] === data.time[randomIndex].value) {
                                return
                            }
                            vm.$set(item, type, data.time[randomIndex].value)
                            return
                        }

                    })
                    // 离港数据
                leaveData.forEach((item, index) => {
                    if (item.flightId.indexOf(data.time[randomIndex].flightId.toString()) >= 0) {
                        let type = data.time[randomIndex].type.toLowerCase()
                        console.log('进入判断')
                        if (item[type] === data.time[randomIndex].value) {
                            return
                        }
                        vm.$set(item, type, data.time[randomIndex].value)
                        return
                    }

                })

            }

        }

    }
}