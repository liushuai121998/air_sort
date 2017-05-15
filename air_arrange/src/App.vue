<template>
  <div id="app">
    <v-header></v-header>
    <side-bar></side-bar>
    <table-content></table-content>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './components/Header'
import sideBar from './components/sideBar'
import tableContent from './components/tableContentTest'
import footer from './components/footer'

export default {
  name: 'app',
  data () {
    return {
     
    }
  },
  methods: {
    
  },
  components: {'v-header': header, 'side-bar': sideBar, 'table-content': tableContent, 'v-footer': footer}
}
</script>

<style>
  
</style>
