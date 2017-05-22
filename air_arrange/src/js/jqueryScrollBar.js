import css from '../utils/transform.js'
export default {
    /**
     * 滚动条滚动
     * @param {*} el 
     * @param {*} tal 
     */
    resize(el, tal, el2, el3, el4) {
        let dom = document.querySelector(el)
        let dom2 = document.querySelector(el2)
        let dom3 = document.querySelectorAll(el3)
        let dom4 = document.querySelector(el4)
            // 表格的dom tbody
        let tableDom = document.querySelectorAll(tal)
        let leftValue = 0
        for (var i = 0, len = tableDom.length; i < len; i++) {
            leftValue += tableDom[i].parentNode.offsetWidth
        }
        css(dom.parentNode, 'translateX', leftValue)
        dom.style.height = ((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / tableDom[0].offsetHeight + 'px'

        dom2.parentNode.style.width = tableDom[0].parentNode.offsetWidth + 'px'
        dom2.style.width = ((dom2.parentNode.offsetWidth) * (dom2.parentNode.offsetWidth)) / tableDom[0].offsetWidth + 'px'
            // console.log(dom3)
        setTimeout(function() {
            dom3.forEach(item => {
                // console.log(document.querySelectorAll('.rightWrap .theadWrap')[0].offsetWidth)
                item.style.width = document.querySelectorAll('.rightWrap')[0].offsetWidth + 'px'
                item.style.right = -document.querySelectorAll('.rightWrap')[0].offsetWidth + 'px'
            })
        }, 200)
        dom4.style.height = document.documentElement.clientHeight - 60 + 'px'

        window.onresize = function() {

            let leftValue = 0
            for (var i = 0, len = tableDom.length; i < len; i++) {
                leftValue += tableDom[i].parentNode.offsetWidth
            }
            css(dom.parentNode, 'translateX', leftValue)
            dom.style.height = ((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / tableDom[0].offsetHeight + 'px'

            dom2.parentNode.style.width = tableDom[0].parentNode.offsetWidth + 'px'
            dom2.style.width = ((dom2.parentNode.offsetWidth) * (dom2.parentNode.offsetWidth)) / tableDom[0].offsetWidth + 'px'
                // console.log(dom3)
            setTimeout(function() {
                dom3.forEach(item => {

                    item.style.width = document.querySelectorAll('.rightWrap')[0].offsetWidth + 'px'
                    item.style.right = -document.querySelectorAll('.rightWrap')[0].offsetWidth + 'px'
                })
            }, 200)

            dom4.style.height = document.documentElement.clientHeight - 60 + 'px'
        }
    },
    scrollBar(el, tal, { mergeWrap, diviContent1, diviContent2 }) {
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
        if (mergeWrap) {
            scrollTbody(mergeWrap)
        } else {
            scrollTbody(diviContent1)
            scrollTbody(diviContent2)
        }

        function scrollTbody(parent) {
            // 滚动条的dom
            let dom = parent.querySelector(el)
                // 表格的dom tbody
            let tableDom = parent.querySelectorAll(tal)
                // 滚动条的位置
            if (tableDom[0].offsetHeight <= dom.parentNode.offsetHeight) {
                dom.style.height = dom.parentNode.offsetHeight + 'px'
                return
            }
            // 滚动条的高度
            setTimeout(function() {
                dom.style.height = ((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / (tableDom[0].offsetHeight) + 'px'
            }, 20)


            // 自定义滚动条
            dom.onmousedown = function(ev) {
                ev = ev || event
                    // ev.preventDefault()
                    // elementPoint.top = this.offsetTop
                elementPoint.top = css(this, 'translateY')
                startPoint.top = ev.clientY
                let tableMaxT = tableDom[0].offsetHeight - dom.parentNode.offsetHeight + 68
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
                    // dom.style.top = T + 'px'
                    css(dom, 'translateY', T)
                        //css(dom, 'translateZ')
                    for (var i = 0, len = tableDom.length; i < len; i++) {
                        // tableDom[i].style.top = -T * scale + 'px'
                        css(tableDom[i], 'translateY', -T * scale)
                            //css(tableDom[i], 'translateZ')
                    }
                }
                document.onmouseup = function() {
                    document.onmousemove = document.onmouseup = null
                }
                return false
            }
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
                // console.log(tableDom, 'tableDom')
                ev = ev || event
                    //console.log(ev.wheelDelta, ev)
                    // ev.whellDelta 为正 鼠标向上滚 (120)
                    // ev.wheelDelta 为负 鼠标向下滚 (-120)
                const maxT = dom.parentNode.offsetHeight - dom.clientHeight
                let top = 0
                let tableMaxT = tableDom[0].offsetHeight - dom.parentNode.offsetHeight
                if (tableDom[0].offsetHeight < document.documentElement.clientHeight) {
                    return
                }
                const scale = tableMaxT / (dom.parentNode.offsetHeight - dom.clientHeight)
                if (ev.wheelDelta > 0) {
                    // 鼠标向上滚 滚动条向上滚
                    // top = dom.offsetTop - 30
                    top += css(dom, 'translateY') - 30
                    if (top < 0) {
                        top = 0
                    }

                } else if (ev.wheelDelta < 0) {
                    // 向下滚 滚动条向下滚
                    // top = dom.offsetTop + 30
                    top += css(dom, 'translateY') + 30
                    if (top > maxT) {
                        top = maxT
                    }
                }
                // dom.style.top = top + 'px'
                css(dom, 'translateY', top)
                    //css(dom, 'translateZ')
                for (var i = 0, len = tableDom.length; i < len; i++) {
                    // tableDom[i].style.top = -top * scale + 'px'
                    css(tableDom[i], 'translateY', -top * scale)
                        //css(tableDom[i], 'translateZ')
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
                // top += dom.offsetTop + 20
                top += css(dom, 'translateY') + 20
                if (top > maxT) {
                    top = maxT
                }

            } else if (ev.detail < 0) {
                // 向下滚
                // top += dom.offsetTop - 20
                top += css(dom, 'translateY') - 20
                if (top < 0) {
                    top = 0
                }
            }
            // dom.style.top = top + 'px'
            css(dom, 'translateY', top)
                //css(dom, 'translateZ')
            for (var i = 0, len = tableDom.length; i < len; i++) {
                //tableDom[i].style.top = -top * scale + 'px'
                css(tableDom[i], 'translateY', -top * scale)
                    // css(tableDom[i], 'translateZ', 1)
            }
        })

    },
    /**
     * 水平滚动条
     * @param {*} el 
     * @param {*} tal 
     */
    scrollXBar(el, tal, { mergeWrap, diviContent1, diviContent2 }) {
        // console.log(mergeWrap, 'mergeWrap')
        scroll(mergeWrap)
        scroll(diviContent1)
        scroll(diviContent2)

        function scroll(parent) {
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
            let dom = parent.querySelector(el)


            // 表格的dom tbody
            let tableDom = parent.querySelectorAll(tal)
                // console.log(dom.parentNode)
            dom.parentNode.style.width = tableDom[0].parentNode.offsetWidth + 'px'

            const maxL = dom.parentNode.offsetWidth - dom.offsetWidth

            dom.style.width = ((dom.parentNode.offsetWidth) * (dom.parentNode.offsetWidth)) / tableDom[0].offsetWidth + 'px'
                // console.log(((dom.parentNode.offsetWidth) * (dom.parentNode.offsetWidth)) / tableDom[0].offsetWidth + 'px')
                // 滚动条的宽度
            setTimeout(function() {
                dom.style.width = ((dom.parentNode.offsetWidth) * (dom.parentNode.offsetWidth)) / tableDom[0].offsetWidth + 'px'
            }, 20)


            // 自定义滚动条
            dom.onmousedown = function(ev) {
                ev = ev || event
                    // ev.preventDefault()
                elementPoint.left = css(this, 'translateX')
                    // elementPoint.left = this.offsetLeft
                startPoint.left = ev.clientX
                let tableMaxL = tableDom[0].offsetWidth - tableDom[0].parentNode.offsetWidth
                    // console.log(tableDom[0].offsetWidth, 'tableDom[0].offsetWidth')
                const scale = tableMaxL / (dom.parentNode.offsetWidth - dom.clientWidth)
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
                    // dom.style.left = L + 'px'
                    css(dom, 'translateX', L)
                        // css(dom, 'translateZ', 1)
                    for (var i = 0, len = tableDom.length; i < len; i++) {
                        // tableDom[i].style.left = -L * scale + 'px'
                        css(tableDom[i], 'translateX', -L * scale)
                            // css(tableDom[i], 'translateZ')
                    }
                }
                document.onmouseup = function() {
                    document.onmousemove = document.onmouseup = null
                }
                return false
            }
        }
    },
    /**
     * 表格宽度拉伸
     */
    widthScale(el, vm) {
        let _this = this
        let elDom = document.getElementById(el);
        let divs = elDom.getElementsByTagName('div');
        let divArr = [].slice.call(divs)
        let widthArr = []
        console.log(divArr.length)
        divArr.forEach((divDom, index) => {
            // 将之前的数据width百分比都转化为px
            widthArr.push(divDom.parentNode.offsetWidth)
            divDom.addEventListener('mousedown', function(ev) {
                let id = ev.target.parentNode.parentNode.id
                console.log('hello world')
                ev.preventDefault();
                // 阻止事件冒泡
                ev.stopPropagation();
                let that = this
                that.startPointX = ev.clientX
                that.width = that.parentNode.offsetWidth
                that.parentWidth = that.parentNode.parentNode.offsetWidth
                document.addEventListener('mousemove', callback)

                function callback(ev) {

                    that.movePointX = ev.clientX
                    let width = that.width + that.movePointX - that.startPointX + 'px'

                    widthArr[index] = that.width + that.movePointX - that.startPointX

                    // that.parentNode.parentNode.style.width = that.parentWidth + that.movePointX - that.startPointX + 'px'

                    // that.parentWidth = that.parentWidth + that.movePointX - that.startPointX

                    // vm.$store.commit('CHANGE_TH_WIDTH', { widthArr, parentWidth: this.parentWidth })
                    vm.$store.commit('CHANGE_TH_WIDTH', { index, widthArr, parentNode: that.parentNode.parentNode, cal: that.movePointX - that.startPointX, $scroll: _this, parentWidth: that.parentWidth, id })
                        // 更新scroll-x 滚动条的宽度
                    document.addEventListener('mouseup', mouseUpEnd)

                    function mouseUpEnd() {
                        document.removeEventListener('mousemove', callback)
                        document.removeEventListener('mouseup', mouseUpEnd)
                    }
                }


            })


        })

    },
    /**
     * 分屏高度拉伸
     * @param {*} el 
     */
    diviHeightScale(el, scrollEl, scrollTbody, { divi1, divi2, $scrollBar }) {
        // 元素刚开始的位置
        let elementPoint = {
                top: 0,
                offsetHeight: 0
            }
            // 鼠标点击的位置
        let startPoint = {
                top: 0
            }
            // 鼠标移动的位置
        let movePoint = {
                top: 0
            }
            // 分屏1
        let divi1ElementPoint = {
                offsetHeight: 0
            }
            // 分屏2
        let dom = divi2.querySelector(el)

        // 分屏1的滚动条
        let divi1Scroll = divi1.querySelector(scrollEl)
            // 分屏2的滚动条
        let divi2Scroll = divi2.querySelector(scrollEl)

        // 滚动区域
        let scrollTbody1 = divi1.querySelectorAll(scrollTbody)
        let scrollTbody2 = divi2.querySelectorAll(scrollTbody)

        // 滚动条的信息
        let scrollParent1 = {
            height: 0
        }
        let scrollParent2 = {
            height: 0
        }
        dom.addEventListener('mousedown', downCallback)

        function downCallback(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            startPoint.top = ev.clientY
            elementPoint.offsetHeight = divi2.offsetHeight

            divi1ElementPoint.offsetHeight = divi1.offsetHeight

            scrollParent1.height = divi1Scroll.parentNode.offsetHeight
            scrollParent2.height = divi2Scroll.parentNode.offsetHeight

            document.addEventListener('mousemove', moveCallback)

            function moveCallback(ev) {
                movePoint.top = ev.clientY
                divi2.style.height = elementPoint.offsetHeight + startPoint.top - movePoint.top + 'px'
                divi1.style.height = divi1ElementPoint.offsetHeight + movePoint.top - startPoint.top + 'px'
                    // 更新滚动条
                divi1Scroll.parentNode.style.height = scrollParent1.height + movePoint.top - startPoint.top + 'px'
                divi2Scroll.parentNode.style.height = scrollParent2.height + startPoint.top - movePoint.top + 'px'

                divi1Scroll.style.height = ((divi1Scroll.parentNode.offsetHeight) * (divi1Scroll.parentNode.offsetHeight)) / scrollTbody1[0].offsetHeight + 'px'
                divi2Scroll.style.height = ((divi2Scroll.parentNode.offsetHeight) * (divi2Scroll.parentNode.offsetHeight)) / scrollTbody2[0].offsetHeight + 'px'


            }
            document.addEventListener('mouseup', upCallback)

            function upCallback() {
                console.log(movePoint.top - startPoint.top)
                document.removeEventListener('mousemove', moveCallback)
                document.removeEventListener('mouseup', upCallback)
            }
        }
    }
}