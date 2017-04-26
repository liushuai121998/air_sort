
export default {
  scrollBar (el, tal) {
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
    let tableDom = document.querySelector(tal)
    const maxT = dom.parentNode.offsetHeight - dom.clientHeight
    // 滚动条的高度
    setTimeout(function(){
      console.log(((dom.parentNode.offsetHeight)*(dom.parentNode.offsetHeight))/tableDom.offsetHeight)
      dom.style.height = ((dom.parentNode.offsetHeight)*(dom.parentNode.offsetHeight))/tableDom.offsetHeight + 'px'
    }, 20)

    // 自定义滚动条
    dom.onmousedown =  function(ev) {
      ev = ev || event
      ev.preventDefault()
      elementPoint.top = this.offsetTop
      startPoint.top = ev.clientY
      let tableMaxT = tableDom.offsetHeight - dom.parentNode.offsetHeight
      const scale = tableMaxT/(dom.parentNode.offsetHeight - dom.clientHeight)
      document.onmousemove = function(ev){
        ev = ev || event
        movePoint.top = ev.clientY
        let T = elementPoint.top + movePoint.top - startPoint.top
        const maxT = dom.parentNode.offsetHeight - dom.clientHeight
        if(T < 0) {
          T = 0
        }else if(T > maxT){
          T = maxT
        }
        dom.style.top = T + 'px'
        tableDom.style.top = -T*scale + 33+ 'px'
      }
      document.onmouseup = function(){
        document.onmousemove = document.onmouseup = null
      }
      return false
    }


  }
}

