var flightServices = "/web/fish"; //服务列表监控后缀?token=114455893
var timeOutInterva, systemConn;
var recount = 60; //断开情况...XX秒后重新连接 
function GetServiceUrl() {
    //return "http://192.168.3.50:8085/microAir/servlet/wechatServlet";
    //return "http://192.168.3.50:8085/microAir/servlet/wechatServlet";
    //return "http://192.168.3.50:8085/FBMS";
    //return "http://192.168.8.18:8088/acdmweb";//发布路径
    var Serviceurl = "ws://" + window.location.host;
    return Serviceurl;
}


//解析参数及值  url？aa=1&bb=3&cc=4
function parseParam(urlinfo) {
    var params = urlinfo.split("?")[1];
    //console.log(params);
    if (params == undefined) {
        return;
    }
    var dataJson = "{";
    var arrayParam = params.split("&");
    for (var i = 0; i < arrayParam.length; i++) {
        var str = arrayParam[i].split("=");
        var key = str[0];
        var value = unescape(str[1]); //url字符序列解码
        dataJson += key + ":'" + value + "',"
    }
    dataJson += "a:1}"
    dataJson = eval("(" + dataJson + ")");
    return dataJson;
}



var strUrl = GetServiceUrl() + flightServices;
//console.log(strUrl);

//var webSocket = new WebSocket('ws://192.168.3.50:8085/com-byteslounge-websockets/websocket');
var webSocket, reurl, recallback;

function doSoConn(url, callback) {
    reurl = url;
    recallback = callback;
    //					if (typeof callback != "function"){
    //		            	//callback(webSocket.readyState); 		            	
    //		            	return;
    //		        	}
    webSocket = new WebSocket(url); //暂时注释
    webSocket.onerror = function(event) {
        //onError(event);
        //console.log("onerror");						
        callback(webSocket, "state", shownowsate(webSocket.readyState));
    };

    webSocket.onopen = function(event) {
        //console.log(webSocket);
        //onOpen(event); 
        callback(webSocket, "state", shownowsate(webSocket.readyState));
    };
    webSocket.onmessage = function(event) {
        //vm.onMessage(event);
        callback(webSocket, "message", event);
    };
    webSocket.onclose = function(event) {
        //webSocket.close();
        //onClose(event);
        //console.log("onclose");
        callback(webSocket, "state", shownowsate(webSocket.readyState));

    };
}

function onOpen(event) {
    //console.log(webSocket.readyState);
    shownowsate(webSocket.readyState);
}


function onError(event) {
    //console.log(event.readyState);
    shownowsate(webSocket.readyState);
}

function onClose(event) {
    //console.log(webSocket.readyState);
    shownowsate(webSocket.readyState);
}

function shownowsate(readyState) {
    if (readyState == "1") {
        //console.log(timeOutInterva+"连接情况");
        if (systemConn == "断开") {
            systemConn = undefined;
            clearTimeout(timeOutInterva);
            //console.log(timeOutInterva+"重新连接成功");
            return "重新连接成功";
        }
        return "已连接";
        //vm.nowdate = "已连接";
        // webSocket.send('{"action":"AllFishSever"}');  
        //$(".heard-skstate").css('color', '#36CE76');
    } else if (readyState == "0") {
        return "没有建立连接";
        //$(".heard-skstate").html("没有建立连接");
        //vm.nowdate = "没有建立连接";
    } else if (readyState == "2") {
        return "连接正在关闭";
        //$(".heard-skstate").html("连接正在关闭");
        //	vm.nowdate = "连接正在关闭";
    } else if (readyState == "3") {
        if (timeOutInterva == undefined) {
            //console.log(timeOutInterva+"===断开");
            systemConn = "断开";
            timeOutInterva = setTimeout("reConnect()", 1000 * recount); //1000为1秒钟  
        }

        return "连接已断开";
        //	vm.nowdate = "连接正在关闭";
        //$(".heard-skstate").html("连接断开");
        //$(".heard-skstate").css('color', '#FF0000');
    }
}



//重新连接机制
function reConnect() {
    try {
        timeOutInterva = undefined;
        doSoConn(reurl, recallback);
    } catch (e) {
        console.log(e)
    }
}