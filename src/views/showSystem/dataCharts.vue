<template>
  <div id="app" class="myhome">
    <div class="home-banner">
      <div class="banner-container">
        <p class="home-title" style="color: whitesmoke">
          Data Charts
        </p>
      </div>
    </div>
    <div class="m-home">
      <div class="container">
        <div class="d-flex justify-content-center" style="margin-bottom: 25px;">
          <div style="text-align: center">
            <el-button v-for="(item,index) in com_list" :key="index" @click="currentTab = item">{{item}}</el-button>
            <component :is="iscomponent"></component>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../../components/layout/Footer'
import Host from '../../components/echarts/Host'
import Serotype from '@/components/echarts/Serotype'
import Province from '@/components/echarts/Province'
import Year from '@/components/echarts/Year'
export default {
  name: 'dataCharts',
  data () {
    return {
      com_list: ['Host', 'Serotype', 'Province', 'Year'],
      currentTab: 'Host'
    }
  },
  components: {
    Host,
    Serotype,
    Province,
    Year,
    Footer
  },
  created () {
    this.ifCanVisit()
  },
  mounted () {
  },
  computed: {
    iscomponent () {
      return this.currentTab.toLowerCase()
    }
  },
  methods: {
    async ifCanVisit () {
      if (window.sessionStorage.getItem('id') === null) {
        const confirmResult = await this.$confirm('您尚未登录，无权限访问数据图表页，是否将以游客方式登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => {
          return err
        })
        // 如果点击确定返回字符串 confirm
        // 如果点击取消返回字符串 cancel
        if (confirmResult !== 'confirm') {
          this.$router.back()
          return this.$message.info('cancel')
        }
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.home-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5%;
  /*  background: #EEEEEE;*/
  /* background: url("../assets/img/system.jpg") center center /*/
  /*cover no-repeat;*/
  background-color: #1b2327;
  background-attachment: fixed;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s !important;
}
.banner-container {
  min-height: 100%;
  margin-top: 0.5%;
  line-height: 1.5;
  color: black;
  width: 100%;
}
.home-title {
  font-size: 20px;
}
.m-home {
  padding-top: 5% !important;
  padding-bottom: 0px !important;
  width: 100%;
}

</style>
