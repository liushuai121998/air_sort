import css from '../utils/transform.js'
export default {
    /**
     * 滚动条滚动
     * @param {*} el
     * @param {*} tal
     */
    resize(scrollx, scroll, { merge, divi1, divi2 }, { content }, isDiviScreen) {
        // function resizeWrap() {
        //     let divi1Dom = document.querySelector(divi1)
        //     let divi2Dom = document.querySelector(divi2)
        //     let mergeDom = document.querySelector(merge)
        //     if (isDiviScreen) {
        //         let scrollXDom1 = divi1Dom.querySelector(scrollx)
        //         scrollXDom1.parentNode.style.width = divi1Dom.querySelector(content).offsetWidth + 'px'
        //         let scrollXDom2 = divi2Dom.querySelector(scrollx)
        //         scrollXDom2.parentNode.style.width = divi2Dom.querySelector(content).offsetWidth + 'px'
        //     } else {
        //         let mergeScrollx = mergeDom.querySelector(scrollx)
        //         mergeScrollx.parentNode.style.width = mergeDom.querySelector(content).offsetWidth + 'px'
        //         let mergeScroll = mergeDom.querySelector(scroll)
        //         css(mergeScroll.parentNode, 'translateX', mergeDom.querySelector(content).offsetWidth)
        //     }
        // }
        // resizeWrap()
        //
        // window.onresize = function() {
        //     resizeWrap()
        // }
    },
    widthScale(el, { mergeWrap, diviContent1, diviContent2 }, vm) {
        // console.log(this)
        let $scorll = this
        if (mergeWrap) {
            vm.$nextTick(() => {
                scale(mergeWrap)
            })
        } else {
            vm.$nextTick(() => {
                scale(diviContent1)
                scale(diviContent2)
            })
        }

        function scale(parent) {
            let elDom = parent.querySelector(el);
            let divs = elDom.getElementsByTagName('div');
            let divArr = [].slice.call(divs)
            let ulDoms = parent.getElementsByClassName('contentWrap')[0].getElementsByClassName('scrollTbody')[0].querySelectorAll('ul')
            divArr.forEach((divDom, index) => {
                divDom.addEventListener('mousedown', function(ev) {

                    vm.$store.commit('UPDATE_IS_SORT', false)
                    ev.preventDefault();
                    // 阻止事件冒泡
                    ev.stopPropagation();
                    let that = this
                    that.startPointX = ev.clientX
                    that.width = that.parentNode.offsetWidth
                    document.addEventListener('mousemove', callback)

                    function callback(ev) {

                        that.movePointX = ev.clientX
                        let width = that.width + that.movePointX - that.startPointX
                        let liNodes = that.parentNode.parentNode.getElementsByTagName('li')
                        let liIndex = [].slice.call(liNodes).indexOf(that.parentNode)

                        if (liIndex === 0 || liIndex === 1) {
                            return
                        }

                        that.parentNode.style.width = width + 'px';
                        ulDoms[liIndex].style.width = width + 'px';

                    }
                    document.addEventListener('mouseup', mouseUpEnd)

                    function mouseUpEnd() {
                        vm.$store.commit('UPDATE_IS_SORT', true)
                        $scorll.moveWrapWidth(parent, '.move_wrap', '.tab')
                        document.removeEventListener('mousemove', callback)
                        document.removeEventListener('mouseup', mouseUpEnd)
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

    },
    /**
     * 表头固定
     * @param {*} parent
     * @param {*} el
     * @param {*} el2
     */
    theadFixed(parent, el, el2) {
        let contentWrap = parent.querySelector(el)
        let theadWrap = contentWrap.querySelector(el2)
        let fixedIndex = parent.querySelectorAll('.index_fixed')
        console.log(fixedIndex.length)
        contentWrap.onscroll = function(ev) {
            theadWrap.style.top = this.scrollTop + 'px';
            // 计算太多 执行多次
            [].slice.call(fixedIndex).forEach((item, index) => {
                console.log('hhhhh')
                item.style.left = this.scrollLeft + 'px'
            })

        }
    },
    /**
     * 显示省略号
     */
    showEclips() {
        let ulNodes = document.getElementsByTagName('ul');
        [].slice.call(ulNodes).forEach((ulItem, ulIndex) => {
            let liNodes = ulItem.getElementsByTagName('li');
            [].slice.call(liNodes).forEach((liItem, liIndex) => {
                new ellipsis(liItem)
            })
        })

        ellipsis.prototype.format = function() {

            var _cols = Math.floor(this._width / this._fontSize);

            return _cols - 3;

        }

        function ellipsis(obj) {
            this.obj = obj;
            this._width = getStyle(this.obj, "width");
            this._fontSize = getStyle(this.obj, "fontSize");
            var limit = this.format();
            console.log(limit)
            var _html = obj.innerHTML;
            obj.innerHTML = _html.substring(0, limit) + "...";
        }

        function getStyle(e, p) {
            var s = e.currentStyle ? e.currentStyle[p] : document.defaultView.getComputedStyle(e, null)[p];
            return parseInt(s);
        }
    },
  /**
   * moveWrap 的宽度
   * @param parent
   * @param el
   * @param el2
   */
    moveWrapWidth (parent, el, el2) {
      let moveWrap = parent.querySelector(el)
      console.log(moveWrap)
      let tab = parent.querySelector(el2)
      moveWrap.style.width = tab.offsetWidth - 142 + 'px';
      //console.log(tab.offsetWidth)
    }
}
