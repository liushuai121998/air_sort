<template>
  <div id="app">
    <div v-if='isContentShow.isShow'>
      <v-header></v-header>
      <side-bar></side-bar>
      <table-content></table-content>
      <v-footer></v-footer>
    </div>
    <div v-else>
      <login></login>
    </div>
  </div>
</template>

<script>
import header from './components/Header'
import sideBar from './components/sideBar'
import tableContent from './components/tableContentTest'
import footer from './components/footer'
import login from './components/login'
import Vue from 'vue'
export default {
  name: 'app',
  data () {
    return {
      isContentShow: this.$store.state.isContentShow
    }
  },
  created () {
    // 发送ajax
      this.$http.post('http://192.168.7.53:8080/getInitData', {"username": 'ghms_admin'}).then((res) => {

        this.$store.commit('GET_INIT_DATA', res.data)

      }, (error) => {
        console.log('error')
      })  
  },
  methods: {
    
  },
  computed: {
    // data () {
    //   return this.$store.state.initData
    // }
  }, 
  components: {'v-header': header, 'side-bar': sideBar, 'table-content': tableContent, 'v-footer': footer, 'login': login}
}
</script>

<style>
  
</style>
