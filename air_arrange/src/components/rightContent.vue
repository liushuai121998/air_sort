<template>
    <div class='right_message' ref='sideContent'>
        <section v-for='(item, index) in messages' :ref='item.secRef'>
            <div class='header_info'>
                <span>{{item.title}}</span>
                <input type='text'>
                <div class='cog' @click='hiddenSection($event, item.ref)'>
                    <span class="icon-cog"></span>
                </div>
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
    export default {
        data () {
            return {
                messages: [{secRef: '0_sec', ref: 'air', title: '航班'}, {secRef: '1_sec', ref: 'service', title: '服务'}, {secRef: '2_sec', ref: 'message', title: '消息'}],
                undoArr: []
            }
        },
        methods: {
            hiddenSection (ev, ref) {
                ev.target.isClick = !ev.target.isClick
                if(ev.target.isClick) {
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
                    this.$refs.sideContent.removeChild(this.$refs[item.secRef][0])   

                    if(this.undoArr.indexOf(item.secRef) >= 0) {
                        this.undoArr.splice(this.undoArr.indexOf(item.secRef), 1).push(item.secRef)
                    }else {
                        this.undoArr.push(item.secRef)
                    }
                }
            },
            undo(ev, item) {
                 console.log(this.undoArr)
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
        top: 30px;
        width: 138px;
        height: 100%;
        background: black;
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
    section input {
        width: 50px;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        -moz-appearance: none;
        border-radius: 5px;
        border: 1px solid black;
    }
    .icon-cog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        font-size: 20px;
        color: #fff;
    }
    .cog{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 5px;
        margin: auto;
        width: 25px;
        height: 25px;
        background: #02bdf2;
        border-radius: 5px;
        cursor: pointer;
    }

</style>