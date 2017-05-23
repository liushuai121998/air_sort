<template>
    <footer class='footer'>
        <span>正在监控</span>
        <section>
            <span>
                到港：{{comeLength}}班
            </span>
            <span>
                离港：{{leaveLength}}班
            </span>
            <span>
                合并：{{mergeLength}}班
            </span>
            <span>
                总数：{{comeLength + leaveLength}}班
            </span>
            <span>Ctrl+S配置</span>
            <span>Ctrl+H颜色示例</span>
        </section>
    </footer>
</template>
<script>
    export default {
        data () {
            return {
                comeLength: this.$store.state.comeData.length,
                leaveLength: this.$store.state.leaveData.length,
                mergeLength: this.$store.state.data.contentData.length
            }
        }
    }
</script>
<style>
    .footer {
        margin-left: 60px;
        width: calc(100% - 60px);
        height: 30px;
        background: #3b3b3b;
        /*background: #bfa;*/
        color: #fff;
        line-height: 30px;
    }
    .footer section {
        float: right;
    }
    .footer section span {
        display: inline-block;
        margin-left: 80px;
    }
    .footer section span:last-child {
        margin-right: 300px;
    }
</style>