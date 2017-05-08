export default {
    /**
     * 滚动条滚动
     * @param {*} el 
     * @param {*} tal 
     */
    scrollBar(el, tal) {
        // 元素刚开始的位置
        let elementPoint = {
                left: 0,
                top: 0,
            }
            // 鼠标点击的位置
        let startPoint = {
                top: 0,
                left: 0
            }
            // 鼠标移动的位置
        let movePoint = {
                left: 0,
                top: 0
            }
            // 滚动条的dom
        let dom = document.querySelector(el)
            // 表格的dom tbody
        let tableDom = document.querySelectorAll(tal)

        // 滚动条的位置
        let leftValue = 0
        for (var i = 0, len = tableDom.length; i < len; i++) {
            leftValue += tableDom[i].offsetWidth
        }
        dom.parentNode.style.left = 80 + leftValue + 'px'
        const maxT = dom.parentNode.offsetHeight - dom.clientHeight
            // 滚动条的高度
        setTimeout(function() {
            console.log(((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / tableDom[0].offsetHeight)
            dom.style.height = ((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / tableDom[0].offsetHeight + 'px'
        }, 20)

        // 自定义滚动条
        dom.onmousedown = function(ev) {
            ev = ev || event
                // ev.preventDefault()
            elementPoint.top = this.offsetTop
            startPoint.top = ev.clientY
            let tableMaxT = tableDom[0].offsetHeight - dom.parentNode.offsetHeight
            const scale = tableMaxT / (dom.parentNode.offsetHeight - dom.clientHeight)
            document.onmousemove = function(ev) {
                ev = ev || event
                movePoint.top = ev.clientY
                let T = elementPoint.top + movePoint.top - startPoint.top
                const maxT = dom.parentNode.offsetHeight - dom.clientHeight
                if (T < 0) {
                    T = 0
                } else if (T > maxT) {
                    T = maxT
                }
                dom.style.top = T + 'px'
                for (var i = 0, len = tableDom.length; i < len; i++) {
                    tableDom[i].style.top = -T * scale + 'px'
                }
            }
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null
            }
            return false
        }
    },

    /**
     * 鼠标滚轮滚动
     * (解决) 鼠标向下滚 页面向上
     *        鼠标向上滚 页面向下
     * @param {*} el 
     * @param {*} tal 
     */
    mouseScroll(el, tal) {
        // 滚动条的dom
        let dom = document.querySelector(el)
            // 表格的dom tbody
        let tableDom = document.querySelectorAll(tal)

        /**
         * 
         * @param {*事件对象} obj 
         * @param {*事件类型} type 
         * @param {*回调函数} fn 
         */
        function addEvent(obj, type, fn) {
            if (obj.attachEvent) {
                // IE
                obj.attachEvent('on' + type, fn)
            } else {
                // chrome和fireFox
                obj.addEventListener(type, fn, false)
            }
        }
        // chrome IE
        addEvent(document.body, 'mousewheel', function(ev) {
                ev = ev || event
                    //console.log(ev.wheelDelta, ev)
                    // ev.whellDelta 为正 鼠标向上滚 (120)
                    // ev.wheelDelta 为负 鼠标向下滚 (-120)
                const maxT = dom.parentNode.offsetHeight - dom.clientHeight
                let top = 0
                let tableMaxT = tableDom[0].offsetHeight - dom.parentNode.offsetHeight
                const scale = tableMaxT / (dom.parentNode.offsetHeight - dom.clientHeight)
                    // console.log(ev.wheelDelta, 'ev.wheelDelta')
                if (ev.wheelDelta > 0) {
                    // 鼠标向上滚 滚动条向上滚
                    top = dom.offsetTop - 30
                    if (top < 0) {
                        top = 0
                    }

                } else if (ev.wheelDelta < 0) {
                    // 向下滚 滚动条向下滚
                    top = dom.offsetTop + 30
                    if (top > maxT) {
                        top = maxT
                    }
                }
                dom.style.top = top + 'px'
                for (var i = 0, len = tableDom.length; i < len; i++) {
                    tableDom[i].style.top = -top * scale + 'px'
                }
            })
            // fireFox
        addEvent(document.body, 'DOMMouseScroll', function(ev) {
            ev = ev || event
                //console.log(ev.detail, 'ev______________________')
                // ev.detail 为负 鼠标向上滚 (-3)
                // ev.detail 为正 鼠标向下滚 (3)
            const maxT = dom.parentNode.offsetHeight - dom.clientHeight
            let top = 0
            let tableMaxT = tableDom[0].offsetHeight - dom.parentNode.offsetHeight
            const scale = tableMaxT / (dom.parentNode.offsetHeight - dom.clientHeight)
            if (ev.detail > 0) {
                // 向上滚
                top += dom.offsetTop + 20
                if (top > maxT) {
                    top = maxT
                }

            } else if (ev.detail < 0) {
                // 向下滚
                top += dom.offsetTop - 20
                if (top < 0) {
                    top = 0
                }
            }
            dom.style.top = top + 'px'
            for (var i = 0, len = tableDom.length; i < len; i++) {
                tableDom[i].style.top = -top * scale + 'px'
            }
        })

    },
    /**
     * 移动到指定的位置
     * @param {*} el 
     * @param {*} tal 
     * @param {*} index 
     */
    moveToDestation(el, tal, index) {
        let dom = document.querySelector(el)
            // 表格的dom tbody
        let tableDom = document.querySelectorAll(tal)
        let tdHeight = tableDom[0].getElementsByTagName('td')[0].offsetHeight
        let tableMaxT = tableDom[0].offsetHeight - dom.parentNode.offsetHeight
        const scale = tableMaxT / (dom.parentNode.offsetHeight - dom.clientHeight)
        let top = (index - 1) * tdHeight
        dom.style.top = top / scale + 'px'
        for (var i = 0, len = tableDom.length; i < len; i++) {
            tableDom[i].style.top = -top + 'px'
        }
    },
    /**
     * 水平滚动条
     * @param {*} el 
     * @param {*} tal 
     */
    scrollXBar(el, tal) {
        // 元素刚开始的位置
        let elementPoint = {
                left: 0
            }
            // 鼠标点击的位置
        let startPoint = {
                left: 0
            }
            // 鼠标移动的位置
        let movePoint = {
                left: 0
            }
            // 滚动条的dom
        let dom = document.querySelector(el)

        // 表格的dom tbody
        let tableDom = document.querySelectorAll(tal)
            //console.error(document.querySelector('.contentWrap').offsetWidth + document.querySelector('.rightWrap').offsetWidth)
        dom.parentNode.style.width = document.querySelector('.contentWrap').offsetWidth + document.querySelector('.rightWrap').offsetWidth + 'px'

        const maxL = dom.parentNode.offsetWidth - dom.clientWidth
            // 滚动条的宽度
        setTimeout(function() {
            console.log(((dom.parentNode.offsetWidth) * (dom.parentNode.offsetWidth)) / tableDom[0].offsetWidth)
            dom.style.width = ((dom.parentNode.offsetWidth) * (dom.parentNode.offsetWidth)) / tableDom[0].offsetWidth + 'px'
        }, 20)

        // 自定义滚动条
        dom.onmousedown = function(ev) {
            ev = ev || event
                // ev.preventDefault()
            elementPoint.left = this.offsetLeft
            startPoint.left = ev.clientX
            let tableMaxL = tableDom[0].offsetWidth - dom.parentNode.offsetWidth
            console.log(tableDom[0].offsetWidth, 'tableDom[0].offsetWidth')
            const scale = tableMaxL / (dom.parentNode.offsetWidth - dom.offsetWidth)
            document.onmousemove = function(ev) {
                ev = ev || event
                movePoint.left = ev.clientX
                let L = elementPoint.left + movePoint.left - startPoint.left
                const maxL = dom.parentNode.offsetWidth - dom.clientWidth
                if (L < 0) {
                    L = 0
                } else if (L > maxL) {
                    L = maxL
                }
                dom.style.left = L + 'px'
                for (var i = 0, len = tableDom.length; i < len; i++) {
                    tableDom[i].style.left = L * scale + 'px'
                }
            }
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null
            }
            return false
        }
    },
    moveTd(el, left) {
        let startPoint = {
            left: 0
        }
        let movePoint = {
            left: 0
        }

        el.onmousedown = function(ev) {
            startPoint.left = ev.clientX
            document.onmousemove = function(ev) {
                movePoint.left = ev.clientX
                el.style.left = left + 'px'
                el.style.width = el.offsetWidth + movePoint.left - startPoint.left + 'px'

            }
        }
        document.onmouseup = function(ev) {
            document.onmousemove = document.onmouseup = null
        }
    }
}