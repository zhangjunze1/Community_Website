<template>
  <div id="app">
    <TopNavBar v-show="( path==='/system' || path==='/dataQuery' || path==='/dataCharts')"></TopNavBar>
    <TopAdminBar v-show="( path==='/login' || path==='/invite' )"></TopAdminBar>
<!--    <TopAdminBar ></TopAdminBar>-->
<!--    <Audio></Audio>-->
    <router-view/>
  </div>
</template>

<script>
import TopNavBar from './components/layout/TopNavBar'
// import Audio from './components/music/Audio'
import Vue from 'vue'
import TopAdminBar from './components/layout/TopAdminBar'
export default {
  data () {
    return {
      path: '',
      myApp: new Vue() // 为了非父子组件共享值
    }
  },
  components: {
    TopAdminBar,
    // Audio,
    TopNavBar
  },
  // 判断路由
  mounted () {
    this.path = this.$route.path
    // console.log(this.$route.path)
  },
  watch: {
    $route (to, from) {
      this.path = to.path
    }
  }
}
</script>
<style>
</style>
