<template>
  <div id="app">
    <v-header></v-header>
    <side-bar></side-bar>
    <table-content></table-content>
  </div>
</template>

<script>
import header from './components/Header'
import sideBar from './components/sideBar'
import tableContent from './components/tableContent'
export default {
  name: 'app',
  components: {'v-header': header, 'side-bar': sideBar, 'table-content': tableContent}
}
</script>

<style>

</style>
