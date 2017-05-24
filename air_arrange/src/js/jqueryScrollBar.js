import css from '../utils/transform.js'
export default {
    /**
     * 滚动条滚动
     * @param {*} el 
     * @param {*} tal 
     */
    // resize(el, tal, el2, el3, el4, isDiviScreen) {
    //     let dom = document.querySelector(el)
    //     let dom2 = document.querySelector(el2)
    //     let dom3 = document.querySelectorAll(el3)
    //     let dom4 = document.querySelector(el4)
    //         // 表格的dom tbody
    //     let tableDom = document.querySelectorAll(tal)
    //     let leftValue = 0
    //     for (var i = 0, len = tableDom.length; i < len; i++) {
    //         leftValue += tableDom[i].parentNode.offsetWidth
    //         console.log(tableDom[i].parentNode.offsetWidth)
    //     }
    //     css(dom.parentNode, 'translateX', leftValue)
    //     dom.style.height = ((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / tableDom[0].offsetHeight + 'px'

    //     dom2.parentNode.style.width = tableDom[0].parentNode.offsetWidth + 'px'
    //     dom2.style.width = ((dom2.parentNode.offsetWidth) * (dom2.parentNode.offsetWidth)) / tableDom[0].offsetWidth + 'px'
    //         // console.log(dom3)
    //     setTimeout(function() {

    //         dom3.forEach(item => {
    //             //console.log(document.querySelectorAll('.rightWrap')[1].offsetWidth)
    //             if (isDiviScreen) {
    //                 item.style.width = document.querySelectorAll('.rightWrap')[1].offsetWidth + 'px'
    //                 item.style.right = -document.querySelectorAll('.rightWrap')[1].offsetWidth + 'px'
    //             } else {
    //                 item.style.width = document.querySelectorAll('.rightWrap')[0].offsetWidth + 'px'
    //                 item.style.right = -document.querySelectorAll('.rightWrap')[0].offsetWidth + 'px'
    //             }
    //         })

    //     }, 200)
    //     dom4.style.height = document.documentElement.clientHeight - 60 + 'px'

    //     window.onresize = function() {

    //         let leftValue = 0
    //         for (var i = 0, len = tableDom.length; i < len; i++) {
    //             leftValue += tableDom[i].parentNode.offsetWidth
    //         }
    //         css(dom.parentNode, 'translateX', leftValue)
    //         dom.style.height = ((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / tableDom[0].offsetHeight + 'px'

    //         dom2.parentNode.style.width = tableDom[0].parentNode.offsetWidth + 'px'
    //         dom2.style.width = ((dom2.parentNode.offsetWidth) * (dom2.parentNode.offsetWidth)) / tableDom[0].offsetWidth + 'px'
    //             // console.log(dom3)
    //         setTimeout(function() {
    //             dom3.forEach(item => {

    //                 item.style.width = document.querySelectorAll('.rightWrap')[0].offsetWidth + 'px'
    //                 item.style.right = -document.querySelectorAll('.rightWrap')[0].offsetWidth + 'px'
    //             })
    //         }, 200)

    //         dom4.style.height = document.documentElement.clientHeight - 60 + 'px'
    //     }


    // },
    resize(scrollx, fixedBar, scroll, { merge, divi1, divi2 }, { content, right }, isDiviScreen) {
        function resizeWrap() {
            let divi1Dom = document.querySelector(divi1)
            let divi2Dom = document.querySelector(divi2)
            let mergeDom = document.querySelector(merge)
            if (isDiviScreen) {
                let scrollXDom1 = divi1Dom.querySelector(scrollx)
                scrollXDom1.parentNode.style.width = divi1Dom.querySelector(content).offsetWidth + 'px'
                let scrollXDom2 = divi2Dom.querySelector(scrollx)
                scrollXDom2.parentNode.style.width = divi2Dom.querySelector(content).offsetWidth + 'px'

                let fixedBar1 = divi1Dom.querySelector(fixedBar)
                fixedBar1.style.width = divi1Dom.querySelector(right).offsetWidth + 'px'
                fixedBar1.style.right = -divi1Dom.querySelector(right).offsetWidth + 'px'

                let fixedBar2 = divi2Dom.querySelector(fixedBar)
                fixedBar2.style.width = divi2Dom.querySelector(right).offsetWidth + 'px'
                fixedBar2.style.right = -divi2Dom.querySelector(right).offsetWidth + 'px'
            } else {
                let mergeScrollx = mergeDom.querySelector(scrollx)
                mergeScrollx.parentNode.style.width = mergeDom.querySelector(content).offsetWidth + 'px'
                let mergeFixedBar = mergeDom.querySelector(fixedBar)
                mergeFixedBar.style.width = mergeDom.querySelector(right).offsetWidth + 'px'
                mergeFixedBar.style.right = -mergeDom.querySelector(right).offsetWidth + 'px'

                let mergeScroll = mergeDom.querySelector(scroll)
                css(mergeScroll.parentNode, 'translateX', mergeDom.querySelector(right).offsetWidth + mergeDom.querySelector(content).offsetWidth)
            }
        }
        resizeWrap()

        window.onresize = function() {
            resizeWrap()
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
                // if (tableDom[0].offsetHeight <= dom.parentNode.offsetHeight) {

            //     dom.style.height = dom.parentNode.offsetHeight + 'px'
            //     return
            // }
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
    mouseScroll(el, tal, { mergeWrap, diviContent1, diviContent2 }) {
        if (mergeWrap) {
            mouseMove(mergeWrap)
        } else {
            mouseMove(diviContent1)
            mouseMove(diviContent2)
        }


        function mouseMove(parent) {
            // 滚动条的dom
            let dom = parent.querySelector(el)
                // 表格的dom tbody
            let tableDom = parent.querySelectorAll(tal)

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
            addEvent(parent, 'mousewheel', function(ev) {
                    // console.log(tableDom, 'tableDom')
                    ev = ev || event
                        //console.log(ev.wheelDelta, ev)
                        // ev.whellDelta 为正 鼠标向上滚 (120)
                        // ev.wheelDelta 为负 鼠标向下滚 (-120)

                    const maxT = dom.parentNode.offsetHeight - dom.clientHeight
                    let top = 0
                    let tableMaxT = tableDom[0].offsetHeight - (dom.parentNode.offsetHeight - 68)
                        // if (tableDom[0].offsetHeight < document.documentElement.clientHeight) {
                        //     return
                        // }
                    const scale = tableMaxT / (dom.parentNode.offsetHeight - dom.clientHeight)
                    if (ev.wheelDelta > 0) {
                        // 鼠标向上滚 滚动条向上滚
                        // top = dom.offsetTop - 30
                        top += css(dom, 'translateY') - 10
                        if (top < 0) {
                            top = 0
                        }

                    } else if (ev.wheelDelta < 0) {
                        // 向下滚 滚动条向下滚
                        // top = dom.offsetTop + 30
                        top += css(dom, 'translateY') + 10
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
            addEvent(parent, 'DOMMouseScroll', function(ev) {
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
                    top += css(dom, 'translateY') + 10
                    if (top > maxT) {
                        top = maxT
                    }

                } else if (ev.detail < 0) {
                    // 向下滚
                    // top += dom.offsetTop - 20
                    top += css(dom, 'translateY') - 10
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

        }
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
                // console.log(dom)

            // 表格的dom tbody
            let tableDom = parent.querySelectorAll(tal)
                // console.log(dom.parentNode)
            dom.parentNode.style.width = tableDom[0].parentNode.getBoundingClientRect().width + 'px'

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
                let tableMaxL = tableDom[0].getBoundingClientRect().width - tableDom[0].parentNode.getBoundingClientRect().width
                    // console.log(tableDom[0].offsetWidth, 'tableDom[0].offsetWidth')
                const scale = tableMaxL / (dom.parentNode.getBoundingClientRect().width - dom.clientWidth)
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
     * 宽度拉伸优化，操作dom，不是通过数据tdLeftData中width数据来改变，影响性能
     * 
     * @param {*} el 
     * @param {*} param1 
     * @param {*} vm 
     */
    widthScale(el, { mergeWrap, diviContent1, diviContent2 }, vm) {
        //let _this = this
        //let widthArr = []
        if (mergeWrap) {
            scale(mergeWrap)
        } else {
            scale(diviContent1)
            scale(diviContent2)
        }

        function scale(parent) {
            let elDom = parent.querySelector(el);
            let divs = elDom.getElementsByTagName('div');
            let divArr = [].slice.call(divs)
            let ulDoms = parent.querySelectorAll('.contentWrap .scrollTbody ul')
            let dom = parent.querySelector('.scroll-x')
            divArr.forEach((divDom, index) => {
                // widthArr.push(divDom.parentNode.offsetWidth)
                divDom.addEventListener('mousedown', function(ev) {
                    this.parentNode.parentNode
                    let targetIndex = divArr.indexOf(this)
                    let id = ev.target.parentNode.parentNode.id
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
                            //let width = that.width + that.movePointX - that.startPointX + 'px'
                        let width = that.width + that.movePointX - that.startPointX

                        //widthArr[index] = that.width + that.movePointX - that.startPointX

                        that.parentNode.style.width = width + 'px'
                        that.parentNode.parentNode.style.width = that.parentWidth + that.movePointX - that.startPointX + 'px';

                        [].slice.call(ulDoms).forEach((ulDom) => {
                            ulDom.children[targetIndex].style.width = width + 'px'
                        })
                        ulDoms[0].parentNode.style.width = that.parentWidth + that.movePointX - that.startPointX + 'px'

                        dom.style.width = ((dom.parentNode.offsetWidth) * (dom.parentNode.offsetWidth)) / ulDoms[0].parentNode.offsetWidth + 'px'

                        // vm.$store.commit('CHANGE_TH_WIDTH', { targetIndex, index, widthArr, parentNode: that.parentNode.parentNode, cal: that.movePointX - that.startPointX, $scroll: _this, parentWidth: that.parentWidth, id, vm })

                        document.addEventListener('mouseup', mouseUpEnd)

                        function mouseUpEnd() {
                            document.removeEventListener('mousemove', callback)
                            document.removeEventListener('mouseup', mouseUpEnd)
                        }
                    }


                })


            })
        }

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
                // console.log(movePoint.top - startPoint.top)
                document.removeEventListener('mousemove', moveCallback)
                document.removeEventListener('mouseup', upCallback)
            }
        }
    },
    /**
     * 选中的目标移动到视口之内
     * @param {*} targetDom 
     * @param {*} divi 
     */
    targetMove(targetDom, divi) {
        //console.log(targetDom.offsetParent)
        if ((targetDom.getBoundingClientRect().top - divi.getBoundingClientRect().top) >= divi.offsetHeight) {
            let top = -((targetDom.getBoundingClientRect().top - divi.getBoundingClientRect().top) - divi.offsetHeight + targetDom.offsetHeight)

            move(top)
        } else if (targetDom.getBoundingClientRect().top < divi.getBoundingClientRect().top) {
            let top = divi.getBoundingClientRect().top - targetDom.getBoundingClientRect().top + divi.offsetHeight - targetDom.offsetHeight
            move(top)
        }

        function move(top) {

            let tableDom = divi.querySelectorAll('.scrollTbody')
            let dom = divi.querySelector('.scroll_bar_child')
            let currentTop = css(tableDom[0], 'translateY')
            top = top + currentTop
            let tableMaxT = tableDom[0].offsetHeight - dom.parentNode.offsetHeight + 68
            const scale = tableMaxT / (dom.parentNode.offsetHeight - dom.clientHeight)
            css(dom, 'translateY', -top / scale)

            for (var i = 0, len = tableDom.length; i < len; i++) {
                css(tableDom[i], 'translateY', top)
            }

        }

    }
}