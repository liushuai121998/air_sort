<template>
    <div class='right_message' ref='sideContent'>
        <section v-for='(item, index) in messages' :ref='item.secRef'>
            <div class='header_info'>
                <span class='header_title'>{{item.title}}</span>
                <input type='text' :id='item.ref' :placeholder='item.holder'><label :for='item.ref'><span class='icon-search'></span></label>
                <div class='cog' @click='hiddenSection($event, item.ref)'>
                    <span class="icon-cog"></span>
                </div>    
            </div>
            <div v-if='item.title==="消息"' class='message_area'>
                <textarea></textarea>
            </div>
            <div class='hidden_set' :ref='item.ref'>
                <div @click='deleteSec($event, item)'>
                    删除
                </div>
                <div>
                    取消事件
                </div>
                <div @click='undo($event, item)'>
                    撤销上一次
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import $scrollBar from '../js/jqueryScrollBar'
    export default {
        data () {
            return {
                messages: [{secRef: '0_sec', ref: 'air', title: '航班通知', holder: '搜索航班通知信息'}, {secRef: '1_sec', ref: 'service', title: '服务告警', holder: '搜索服务告警通知'}, {secRef: '2_sec', ref: 'message', title: '消息', holder: '搜索消息'}],
                undoArr: []
            }
        },
        mounted () {
            this.$refs.sideContent.style.height = document.documentElement.clientHeight - 30 + 'px'
            if(!this.$store.state.isDiviScreen) {
                let rightContent = document.querySelector('.merge_wrap').querySelector('.right_message')
                this.$store.commit('RIGHT_CONTENT', {vm: this, rightContent})
            } else {
                let rightContent = document.querySelector('.divi_wrap').querySelector('.right_message')
                this.$store.commit('RIGHT_CONTENT', {vm: this, rightContent})
            }
        },
        methods: {
            hiddenSection (ev, ref) {
                this.$refs[ref][0].isClick = !this.$refs[ref][0].isClick
                if(this.$refs[ref][0].isClick) {
                    // console.log(this.$refs[ref] instanceof Array)   // true
                    this.$refs[ref][0].style.display = 'flex'
                }else {
                    this.$refs[ref][0].style.display = 'none'
                }
                
            },
            deleteSec (ev, item) {
                if(confirm(`确定删除${item.title}相关信息吗`)) {
                    console.log(this.$refs[item.secRef][0])
                    this.$refs[item.ref][0].style.display = 'none'
                    this.$refs[item.ref][0].isClick = false
                    this.$refs.sideContent.removeChild(this.$refs[item.secRef][0])
                    if(this.undoArr.indexOf(item.secRef) >= 0) {
                        this.undoArr.splice(this.undoArr.indexOf(item.secRef), 1).push(item.secRef)
                    }else {
                        this.undoArr.push(item.secRef)
                    }
                }
                //this.$store.commit('DEL_RIGHT_CONTENT', this.undoArr)
                if(this.undoArr.length === 3) {
                    // if(!this.$store.state.isDiviScreen) {
                    //     // $scrollBar.widthScale('tab', this)
                    //     document.querySelector('.merge_wrap').style.width = 'calc(100% - 15px)'
                    //     document.querySelector('.contentWrap').style.width = '80%'
                    //     document.querySelector('.rightWrap').style.width = '20%'
                    // }else {
                    //     // 分屏
                    //     let content = []
                    //     let right = []
                    //     document.querySelector('.divi_wrap').style.width = 'calc(100% - 15px)';
                    //     [].slice.call(document.querySelector('.divi_wrap').querySelectorAll('.contentWrap')).forEach(item => {
                    //         content.push(item)
                    //         item.style.width = '80%'
                    //     });
                    //     [].slice.call(document.querySelector('.divi_wrap').querySelectorAll('.rightWrap')).forEach(item => {
                    //         right.push(item)
                    //         item.style.width = '20%'
                    //     })
                        
                    // }
                    // $scrollBar.scrollXBar('.scroll-x', '.scrollX', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})

                    // $scrollBar.resize('.scroll', '.merge_wrap .scrollTbody', '.scroll-x', '.fixed-x-bar', '.wrap', this.$store.state.isDiviScreen)
                    // 重新计算横向滚动条的宽度
                    $scrollBar.resize('.scroll-x', '.fixed-x-bar', '.scroll', {merge: '.merge_wrap', divi1: '.divi_content1', divi2: '.divi_content2'}, {content: '.contentWrap', right: '.rightWrap'},  this.$store.state.isDiviScreen)
                    this.$refs.sideContent.style.display = 'none'
                    
                    //$scrollBar.resize('.scroll', '.scrollTbody', '.scroll-x', '.fixed-x-bar', '.wrap')
                }
            },
            undo(ev, item) {    // 撤销   数据驱动
                this.$refs[item.ref][0].isClick = false
                this.$refs[item.ref][0].style.display = 'none'
                if(this.undoArr.length > 0 ){
                    let index = Number(this.undoArr[this.undoArr.length -1].slice(0, 1))
                    if(this.$refs[`${index + 1}_sec`][0]) {    
                        this.$refs.sideContent.insertBefore(this.$refs[`${index}_sec`][0], this.$refs[`${index+1}_sec`][0])
                    }  
                }
            }
        }
    }
</script>
<style scoped>
    .right_message {
        position: absolute;
        right: 0;
        top: 0;
        width: calc(15% - 15px);
        /*height: 100%;*/
        display: flex;
        flex-direction: column;
    }
    section {
        position: relative;
        background: #3b3b3b;
        flex-grow: 1;
    }
    section .header_info {
        position: relative;
        width: 100%;
        height: 34px;
        background: #e8e8e8;
        line-height: 34px;
    }
    section .header_info .header_title {
        /*margin-left: 15px;*/
        display: inline-block;
        width: 25%;
        vertical-align: middle;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    section .header_info input {
        height: 20px;
        /*border: 1px solid black;*/
        width: 55%;
        border-radius: 2px 0 0 2px;
        border: 1px solid #e9e9e9;
        box-sizing: border-box;
    }
    section .header_info label {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: #bebebe;
        text-align: center;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        border-radius: 0 2px 2px 0;
    }
    section .hidden_set {
        position: absolute;
        top: 40px;
        left: 0;
        right: 0;
        margin: auto;
        /*visibility: hidden;*/
        display: none;
        flex-direction: column;
        width: 80px;
        height: 80px;
        background: #fff;
        border: 1px solid #02bdf2;
        border-radius: 8px;
    }
    section .hidden_set div{
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid gray;
        flex-grow: 1;
        cursor: pointer;
    }
    section .hidden_set div:last-child {
        border-bottom: none;
    }
  
    .icon-cog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        font-size: 15px;
        color: #fff;
    }
    .cog{
        position: absolute;
        top: 0;
        bottom: -3px;
        right: 5px;
        margin: auto;
        width: 20px;
        height: 20px;
        background: #02bdf2;
        border-radius: 5px;
        cursor: pointer;
    }

    .message_area {
        position: absolute;
        bottom: 40px;
        left: 0;
        width: 100%;
        height: 40px;
        padding: 0 10px 0;
        box-sizing: border-box;
        transform: translateZ(10px)
    }
    .message_area textarea {
        width: 100%;
        height: 100%;
    }
</style>