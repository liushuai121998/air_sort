export default {
    RANDOM_DATA({ commit }) {
        setInterval(() => {
            commit('RANDOM_DATA')
        }, 3000)
    },
    CHANGE_TH_WIDTH({ commit }, thInfo) {
        setTimeout(() => {
            commit('CHANGE_TH_WIDTH', thInfo)
        }, 10)
    },
    FLIGHT_INFO_UPDATE(context, { vm }) {
        // 航班id
        let randomId = Math.round(Math.random() * (context.state.flightIdArr.length - 1))

        let data = {
            time: [{
                    "flightId": randomId,
                    "type": "ETD",
                    "eventcode": "4132",
                    "value": "1210",
                    "msg": "预计离港时间变更"
                },
                {
                    "flightId": randomId,
                    "type": "ETA",
                    "eventcode": "4131",
                    "value": "1210",
                    "msg": "预计到达时间变更"
                },
                {
                    "flightId": randomId,
                    "type": "line",
                    "eventcode": "4138",
                    "value": "京-沪",
                    "msg": "航线变更"
                },
                {
                    "flightId": randomId,
                    "type": "status",
                    "eventcode": "4135",
                    "value": "前场起飞",
                    "msg": "前场起飞"
                },
                {
                    "flightId": randomId,
                    "type": "status",
                    "eventcode": "4135",
                    "value": "延误",
                    "msg": "延误"
                },
                {
                    "flightId": randomId,
                    "type": "bay",
                    "eventcode": "4135",
                    "value": "333",
                    "msg": "机位变更"
                },
                {
                    "flightId": randomId,
                    "type": "taskcode",
                    "eventcode": "4135",
                    "value": "补班",
                    "msg": "任务变更"
                },
                {
                    "flightId": randomId,
                    "type": "taskcode",
                    "eventcode": "4135",
                    "value": "货班",
                    "msg": "任务变更"
                },
                {
                    "flightId": randomId,
                    "type": "taskcode",
                    "eventcode": "4135",
                    "value": "正班",
                    "msg": "任务变更"
                },
                {
                    "flightId": randomId,
                    "type": "status",
                    "eventcode": "4135",
                    "value": "取消",
                    "msg": "状态变更"
                },
                {
                    "flightId": randomId,
                    "type": "airType",
                    "eventcode": "4135",
                    "value": "333",
                    "msg": "机型变更"
                },
                {
                    "flightId": randomId,
                    "type": "runway",
                    "eventcode": "4135",
                    "value": "02/R",
                    "msg": "跑道变更"
                },
                {
                    "flightId": randomId,
                    "type": "arming",
                    "eventcode": "4135",
                    "value": "0000",
                    "msg": "预位时间变更"
                },
                {
                    "flightId": "231",
                    "type": "status",
                    "eventcode": "4135",
                    "value": {
                        "flightId": "890",
                        "operationDate": "2017-05-18 00:00:00",
                        "flightNo": "EU6678",
                        "aOrD": "A",
                        "repeatCount": "0",
                        "services": [{
                                "detailNo": "0113",
                                "detailName": "允许登机",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "E"
                            },
                            {
                                "detailNo": "0112",
                                "detailName": "国内登机开始",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "E"
                            },
                            {
                                "detailNo": "0114",
                                "detailName": "国际登机开始",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "E"
                            },
                            {
                                "detailNo": "0087",
                                "detailName": "国内登机结束",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "S"
                            },
                            {
                                "detailNo": "0087",
                                "detailName": "国内登机结束",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "E"
                            },
                            {
                                "detailNo": "0082",
                                "detailName": "国际登机结束",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "S"
                            },
                            {
                                "detailNo": "0082",
                                "detailName": "国际登机结束",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "E"
                            },
                            {
                                "detailNo": "0199",
                                "detailName": "优利催促登机",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "S"
                            },
                            {
                                "detailNo": "0199",
                                "detailName": "优利催促登机",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "E"
                            },
                            {
                                "detailNo": "0197",
                                "detailName": "优利本站登机",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "S"
                            },
                            {
                                "detailNo": "0197",
                                "detailName": "优利本站登机",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "E"
                            },
                            {
                                "detailNo": "0198",
                                "detailName": "优利过站登机",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "S"
                            },
                            {
                                "detailNo": "0198",
                                "detailName": "优利过站登机",
                                "planTime": "/",
                                "actualTime": "/",
                                "sorE": "E"
                            },
                            {
                                "detailNo": "0050",
                                "detailName": "进港接桥载到位",
                                "planTime": "0023",
                                "actualTime": "/",
                                "sorE": "S"
                            },
                            {
                                "detailNo": "0050",
                                "detailName": "进港接桥载到位",
                                "planTime": "0023",
                                "actualTime": "/",
                                "sorE": "E"
                            }
                        ],
                        "regNo": "B8608",
                        "airType": "320",
                        "vip": "N",
                        "brother": "EU2747",
                        "brotherDate": "2017-05-18 00:00:00.0",
                        "brotherNo": "0",
                        "dori": "国内",
                        "taskcode": "正班",
                        "status": "无",
                        "bay": "无",
                        "gate": "无",
                        "line": "浦-蓉",
                        "runway": "/",
                        "arming": "/",
                        "close": "/",
                        "mark": "T      ",
                        "sta": "2017-05-18 00:05:00.0",
                        "eta": "/",
                        "ata": "/",
                        "std": null,
                        "etd": null,
                        "atd": null,
                        "counter": "/",
                        "baggage": "/",
                        "agent": "/"
                    },
                    "msg": "新增航班"
                }
            ]
        }
        console.log(data)
            // vm.$http.get('/api/timeUpdate').then((res) => {
            // console.log(res.data)
        context.commit('FLIGHT_INFO_UPDATE', { data, vm })
            //})

    }
}