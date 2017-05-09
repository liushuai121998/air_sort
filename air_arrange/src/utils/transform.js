// 定义一个方法css transform
//el:需要获取或设置transform值的元素
//attr:获取或设置的transform的属性
//val:设置的transform的属性值
export default function css(el, attr, val) {
    if (!el.tranform) { //判断只在无el.tranform属性时新创建el.tranform
        el.tranform = {} //为元素el设置一个属性，为一个空对象
    }
    if (arguments.length > 2) { //判断是否有传入val，有则执行封装函数设置transform值的功能
        el.tranform[attr] = val;
        var sVal = ""; //用于储存多个transform值

        for (var attrs in el.tranform) {
            switch (attrs) {
                case "rotate":
                case "rotateX":
                case "rotateY":
                case "rotateZ":
                case "rotate":
                case "skewX":
                case "skewY":
                    sVal += attrs + "(" + el.tranform[attrs] + "deg) "; //注意此处的空格要加上
                    break;

                case "translateX":
                case "translateY":
                case "translateZ":
                    sVal += attrs + "(" + el.tranform[attrs] + "px) "; //注意单位的变化
                    break;

                case "scale":
                case "scaleX":
                case "scaleY":
                    sVal += attrs + "(" + el.tranform[attrs] + ") "; //注意单位的变化
                    break;
            }
        }
        el.style.webkitTransform = el.style.transform = sVal;
    } else { //判断是否有传入val，无则执行封装函数获取transform值的功能
        var val = el.tranform[attr]; //获取由该函数设置的transform值的元素的获取transform值
        if (typeof val == "undefined") { //如果想要获取默认值的话
            if (attr == "scale" || attr == "scaleX" || attr == "scaleY") {
                val = 1;
            } else {
                val = 0;
            }
        }
        return val;
    }

}