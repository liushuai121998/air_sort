<template>
  <div id="app">
    <v-header></v-header>
    <side-bar></side-bar>
    <table-content></table-content>
    <right-content></right-content>
  </div>
</template>

<script>
import header from './components/Header'
import sideBar from './components/sideBar'
import tableContent from './components/tableContent'
import rightContent from './components/rightContent'
export default {
  name: 'app',
  data () {
    return {
     
    }
  },
  methods: {
    
  },
  components: {'v-header': header, 'side-bar': sideBar, 'table-content': tableContent, 'right-content': rightContent}
}
</script>

<style>

</style>
