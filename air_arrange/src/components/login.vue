<template>
    <div class='login'>
            <div class='form'>
                <label>用户名</label><input type='text' ref='user' value='ghms_admin'>
                <label>密码</label><input type='password'>
                <input type='button' value='登录' @click='showContent'>
            </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            showContent () {
                this.$store.commit('SHOW_CONTENT', {val: this.$refs.user.value, vm: this})
            }
        }
    }
</script>
<style>
    .login input {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        width: 100%;
        height: 20px;
        border: 1px solid red;
        display: block; 
        margin-bottom: 10px;
        border-radius: 2px;
    }
    .login input[type=button] {
        width: 40px;
    }
    .login .form {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 200px;
        /*height: 100px;*/
        margin: 20px auto;
    }
    .login {
        position: relative;
        width: 300px;
        height: 200px;
        background: #fff;
        border: 1px solid blue;
        border-radius: 10px;
        margin: 200px auto;
    }
</style>