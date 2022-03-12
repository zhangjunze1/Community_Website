<template>
  <el-container class="main_container">
    <!--侧边栏-->
    <el-aside :width="isCollapse?'1.185rem':'3.703rem'">
      <div class="title_box_main">
        <i style="margin-right: 0.148rem" class="el-icon-odometer"></i>
        <span >沙门氏杆菌展示</span>
      </div>
      <!--展开收起-->
      <div class="toggle_box" @click="toggleCollapse"></div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        :router="true">
        <MenuTree></MenuTree>
      </el-menu>
    </el-aside>
    <el-container>
      <!--头部布局-->
      <el-header >
        <span style="margin-left: 0.3704rem; margin-right: 0.3704rem; font-size: 0.333rem;color: black;size: 0.3704rem">后端管理系统-欢迎您-管理员编号:{{this.$root.ADMIN.id}}</span>

        <div class="right_box">
          <el-dropdown>
            <img src="../../assets/img/dna1.png">
            <!--下拉菜单-->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-home" @click.native="change">首页信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!--路由视图-->
        <router-view></router-view>
      </el-main>
      <el-footer style="height: 0.463rem;text-align: center;background: #F0F8FF" >
        ©Copyright 2021 zhangjz-toishT工作室 | 浙大城市学院小伙
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import MenuTree from '@/components/Tree/MenuTree'
export default {
  name: 'AdminMain',
  components: { MenuTree },
  data () {
    return {
      isCollapse: false,
      adminId: this.$root.ADMIN.id
    }
  },
  created () {
    if (this.adminId !== 1) {
      this.$notify({
        title: '提示',
        message: '您尚未登录,请登录',
        type: 'warning',
        duration: 5000
      })
      this.$router.push('/adminLogin')
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    quit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      // 刷新页面，删除vuex数据
      setTimeout(() => {
        window.location.reload()
      }, 10)
    },
    change () {
      this.$router.push('/host')
    }
  }
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
}
/*头部布局*/
.el-header {
  background-color: #F0F8FF;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: #FFFFFF;
  align-items: center;
  font-size: 0.3704rem;
  /*左边的logo和标题*/
  .left_box{
    display: flex;
    align-items: center;
    font-size: 0.556rem;
    color: #F0F8FF;
    /*logo*/
    img{
      width: 1.0185rem;
      height: 1.0185rem;
      border-radius: 30%;
      margin: 0px 0px 0.0926rem 0.0926rem;
    }
    /*标题*/
    span{
      margin-left: 0.278rem;
    }
  }
  /*右边的登录头像*/
  .right_box{
    .el-dropdown>img{
      height: 1.0185rem;
      width: 1.0185rem;
      border-radius: 50%;
      background-color: #FFFFFF;
      margin: 0px 0.278rem 0px 0px;
      background-size: contain;
    }
  }

}
/*侧边栏*/
.el-aside {
  background-color: #001529;
  text-align: left;
  .el-menu{
    border-right: none;
  }
  /*展开/收起*/
  .toggle_box{
    background-color: white;
    font-size: 0.278rem;
    font-weight: bold;
    line-height: 0.463rem;
    color: black;
    letter-spacing: 0.2em;
    text-align: center;
    cursor: pointer;
  }
  .title_box_main{
    display: flex;
    align-items: center;
    font-size: 0.3704rem;
    height: 1.074rem;
    color: #FFFFFF;
  }
}
/*内容主体*/
.el-main {
  background-color: #E9EEF3;
}
/*菜单下拉样式*/
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.footer{flex: 0;background: #2c3e50}
</style>
