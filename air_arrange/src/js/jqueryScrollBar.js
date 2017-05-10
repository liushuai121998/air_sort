import css from '../utils/transform.js'
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
            // let theadDom = []
            // let theadTopValue = []
            // 滚动条的位置
        let leftValue = 0
        for (var i = 0, len = tableDom.length; i < len; i++) {
            leftValue += tableDom[i].offsetWidth
                // theadDom.push(tableDom[i].querySelector('thead'))
                // theadTopValue.push(css(tableDom[i].querySelector('thead'), 'translateY'))
        }

        // dom.parentNode.style.left = 80 + leftValue + 'px'
        css(dom.parentNode, 'translateX', 80 + leftValue)
        const maxT = dom.parentNode.offsetHeight - dom.clientHeight
            // 滚动条的高度
        setTimeout(function() {
            // console.log(((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / tableDom[0].offsetHeight)
            dom.style.height = ((dom.parentNode.offsetHeight) * (dom.parentNode.offsetHeight)) / tableDom[0].offsetHeight + 'px'
        }, 20)

        // 自定义滚动条
        dom.onmousedown = function(ev) {
            ev = ev || event
                // ev.preventDefault()
                // elementPoint.top = this.offsetTop
            elementPoint.top = css(this, 'translateY')
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
                // dom.style.top = T + 'px'
                css(dom, 'translateY', T)
                css(dom, 'translateZ', 0.00001)
                for (var i = 0, len = tableDom.length; i < len; i++) {
                    // tableDom[i].style.top = -T * scale + 'px'
                    css(tableDom[i], 'translateY', -T * scale)
                    css(tableDom[i], 'translateZ', 0.0001)
                        // css(theadDom[i], 'translateY', T * scale)
                        // css(theadDom[i], 'translateZ', 0.0001)
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
                css(dom, 'translateZ', 0.00001)
                for (var i = 0, len = tableDom.length; i < len; i++) {
                    // tableDom[i].style.top = -top * scale + 'px'
                    css(tableDom[i], 'translateY', -top * scale)
                    css(tableDom[i], 'translateZ', 0.00001)
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
            css(dom, 'translateZ', 0.00001)
            for (var i = 0, len = tableDom.length; i < len; i++) {
                //tableDom[i].style.top = -top * scale + 'px'
                css(tableDom[i], 'translateY', -top * scale)
                css(tableDom[i], 'translateZ', 0.00001)
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
            elementPoint.left = css(this, 'translateX')
            startPoint.left = ev.clientX
            let tableMaxL = tableDom[0].offsetWidth - dom.parentNode.offsetWidth
                // console.log(tableDom[0].offsetWidth, 'tableDom[0].offsetWidth')
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
                //dom.style.left = L + 'px'
                css(dom, 'translateX', L)
                css(dom, 'translateZ', 0.00001)
                for (var i = 0, len = tableDom.length; i < len; i++) {
                    // tableDom[i].style.left = L * scale + 'px'
                    css(tableDom[i], 'translateX', L * scale)
                    css(tableDom[i], 'translateZ', 0.00001)
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
    },
    widthChange(sel) {
        function $(Id) {

            return document.getElementById(Id);
        };
        // 事件监听
        function addListener(element, e, fn) {
            element.addEventListener ? element.addEventListener(e, fn, false) : element.attachEvent("on" + e, fn);
        };
        // 事件解绑
        function removeListener(element, e, fn) {
            element.removeEventListener ? element.removeEventListener(e, fn, false) : element.detachEvent("on" + e, fn);
        };

        // 为元素添加样式
        var Css = function(e, o) {
            if (typeof o == "string") {
                e.style.cssText = o;
                return;
            }
            for (var i in o)
                e.style[i] = o[i];
        };

        var Bind = function(object, fun) {
            var args = Array.prototype.slice.call(arguments).slice(2); // 实参个数大于形参个数
            return function() {
                return fun.apply(object, args);
            };
        };
        var BindAsEventListener = function(object, fun) {
            var args = Array.prototype.slice.call(arguments).slice(2);
            return function(event) {
                return fun.apply(object, [event || window.event].concat(args));
            };
        };
        var Class = function(properties) {
            var _class = function() { // this 谁调用的就是谁
                return (arguments[0] !== null && this.initialize && typeof(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;
            };
            _class.prototype = properties;
            return _class;
        };
        var Table = new Class({
            initialize: function(tab, set) {
                this.table = tab; // tableDom
                this.thead = tab.getElementsByTagName('thead')[0]; //常用的dom元素做成索引 theadNode
                this.theadths = this.thead.getElementsByTagName('th'); // thead下面所有的tdNodes
                this.clos = {}; //里面记录所有列元素的引用 
                this.closarg = {
                    tdnum: null,
                    totdnum: null,
                    closmove: BindAsEventListener(this, this.closmove),
                    closup: BindAsEventListener(this, this.closup)
                }; //关于列拖拽的一些属性方法 
                this.widtharg = {
                    td: null,
                    nexttd: null,
                    x: 0,
                    tdwidth: 0,
                    nexttdwidth: 0,
                    widthmove: BindAsEventListener(this, this.widthmove),
                    widthup: BindAsEventListener(this, this.widthup)
                };
                var i = 0,
                    j = 0,
                    d = document;


                var divs = this.thead.getElementsByTagName('div'); // thead下所有的div

                this.line = d.body.appendChild(d.createElement('div'));
                this.line.className = 'line';
                this.line.style.top = tab.getBoundingClientRect().top + "px";

                for (var i = 0, l = divs.length; i < l; i++) {
                    addListener(divs[i], 'mousedown', BindAsEventListener(this, this.widthdrag));
                }
                /*---------------------------------------------*/
                /*---------------------------------------------*/
                addListener(this.thead, 'mouseover', BindAsEventListener(this, this.theadhover));

            },
            theadhover: function(e) {
                e = e || window.event;
                var obj = e.srcElement || e.target;
                if (obj.nodeName.toLowerCase() == 'th')
                    this.closarg.totdnum = (obj).getAttribute('clos');
                else if (obj.nodeName.toLowerCase() == 'div')
                    obj.style.cursor = "col-resize";
            },
            widthdrag: function(e) {
                e.stopPropagation()
                this.widtharg.x = e.clientX;
                this.widtharg.td = (e.srcElement || e.target).parentNode;
                this.widtharg.nexttd = this.widtharg.td.nextSibling.nextSibling;
                this.widtharg.tdwidth = this.widtharg.td.offsetWidth;
                this.widtharg.nexttdwidth = this.widtharg.nexttd.offsetWidth;
                this.line.style.height = this.table.offsetHeight + "px";
                addListener(document, 'mousemove', this.widtharg.widthmove);
                addListener(document, 'mouseup', this.widtharg.widthup);
            },
            widthmove: function(e) {
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                var x = e.clientX - this.widtharg.x,
                    left = e.clientX,
                    clientx = e.clientX;
                if (clientx < this.widtharg.x) {
                    if (this.widtharg.x - clientx > this.widtharg.tdwidth - 35)
                        left = this.widtharg.x - this.widtharg.tdwidth + 35;
                }
                if (clientx > this.widtharg.x) {
                    if (clientx - this.widtharg.x > this.widtharg.nexttdwidth - 35)
                        left = this.widtharg.x + this.widtharg.nexttdwidth - 35;
                }
                Css(this.line, {
                    display: "block",
                    left: left + "px"
                });
            },
            widthup: function(e) {
                this.line.style.display = "none";
                var x = parseInt(this.line.style.left) - this.widtharg.x;
                this.widtharg.nexttd.style.width = this.widtharg.nexttdwidth - x + 'px';
                this.widtharg.td.style.width = this.widtharg.tdwidth + x + 'px';
                removeListener(document, 'mousemove', this.widtharg.widthmove);
                removeListener(document, 'mouseup', this.widtharg.widthup);
            },

        });
        window.onload = function() {
            new Table($(sel));
        }
    }
}