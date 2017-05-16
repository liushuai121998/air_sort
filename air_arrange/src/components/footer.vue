<template>
    <footer class='footer'>
        <span>正在监控</span>
        <section>
            <span>
                到港：
            </span>
            <span>
                离港：
            </span>
            <span>Ctrl+S配置</span>
            <span>Ctrl+H颜色示例</span>
        </section>
    </footer>
</template>
<script>

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
        margin-left: 120px;
    }
    .footer section span:last-child {
        margin-right: 350px;
    }
</style>