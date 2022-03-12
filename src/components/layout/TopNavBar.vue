<template xmlns:text-decoration="http://www.w3.org/1999/xhtml">
  <div id="navClass" class="navClass" hide-on-scroll flat height="58">
    <!-- 电脑导航栏 -->
    <div class="d-md-block d-none nav-container">
      <div class="float-right nav-title">
        <div class="menus-item">
          <router-link to="/system">
            <i class="iconfont2 iconzhuye" style="color: whitesmoke" /><span style="color: whitesmoke;margin-right: 1.04%">HOME</span>
          </router-link>
        </div>
        <div class="menus-item">
          <router-link :to="'/dataCharts'">
            <i class="iconChartsData" style="color: whitesmoke" /><span style="color: whitesmoke;margin-right: -2%;width: 1.04%">Data Charts</span>
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/dataQuery">
            <i class="iconQueryData" style="color: whitesmoke" /><span style="color: whitesmoke;margin-right: -2%;width: 1.04%">Data Retrieval</span>
          </router-link>
        </div>
        <div class="user-btn">
          <a v-if=" avatar===''">
            <router-link to="/login">
            <i class="iconfont2 icondenglu" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 1.04%">Login</span>
            </router-link>
          </a>
          <template v-else>
            <div style="margin-top: 0%">
              <img
                class="user-avatar"
                src="../../assets/img/home.png"
                height="20"
                width="20"
              />
            </div>
            <ul class="user-submenu">
              <li>
                <router-link to="/adminLogin">
                  <i class="iconfont2 icongerenzhongxin" />后台管理
                </router-link>
              </li>
<!--              <li>-->
<!--                <router-link to="/postblogs">-->
<!--                  <i class="el-icon-edit" /> 发布博客-->
<!--                </router-link>-->
<!--              </li>-->
              <li>
                <a @click="logout"><i class="iconfont2 icontuichu" />退出系统</a>
              </li>
            </ul>
          </template>
        </div>
      </div>
        </div>
      </div>
<!--    </div>-->
<!--  </div>-->
</template>

<script>
export default {
  components: {
  },
  created () {
    this.getUser()
  },
  mounted () {
  },
  data () {
    return {
      navClass: '',
      avatar: '',
      user: {},
      if: '',
      queryString: ''
    }
  },
  methods: {
    getClickCharts () {
      this.ifCanVisit()
    },
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
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/system')
      // 刷新页面，删除vuex数据
      window.location.reload()
    },
    getUser () {
      this.id = window.sessionStorage.getItem('id')
      if (this.id != null) {
        this.avatar = this.id
      }
    }
  },
  computed: {

  }
}
</script>

<style scoped>
  .navClass{
    /*position:fixed; !* 绝对定位，fixed是相对于浏览器窗口定位。 *!*/
    position: relative;
    top: 3%; /* 距离窗口顶部距离 */
    right: 2%;
    height: 1%; /* 高度 */
    float: right;
    z-index: 99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
  i {
    margin-right: 4px;
  }
  ul {
    list-style: none;
  }
  .nav {
    background: rgba(0, 0, 0, 0) !important;
  }
  .nav a {
    color: #eee !important;
  }
  .nav .menus-item a {
    text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
  }
  .nav .blog-title a {
    text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  }
  .theme--light.nav-fixed {
    background: rgba(255, 255, 255, 0.8) !important;
    box-shadow: 0 0.0926rem 6px -0.0926rem rgba(133, 133, 133, 0.6);
  }
  .theme--dark.nav-fixed {
    background: rgba(18, 18, 18, 0.8) !important;
  }
  .theme--dark.nav-fixed a {
    color: rgba(255, 255, 255, 0.8) !important;
  }
  .theme--light.nav-fixed a {
    color: #4c4948 !important;
  }
  .nav-fixed .menus-item a,
  .nav-fixed .menus-btn a,
  .nav-fixed .blog-title a {
    text-shadow: none;
  }
  .nav-container {
    font-size: 14px;
    width: 100%;
    height: 100%;
  }
  .nav-mobile-container {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .blog-title,
  .nav-title {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .blog-title a {
    font-size: 0.333rem;
    font-weight: bold;
  }
  .user-btn,
  .menus-btn,
  .menus-item {
    position: relative;
    display: inline-block;
    margin: 0 0 0 0.875rem;
  }
  .menus-btn a,
  .menus-item a {
    transition: all 0.2s;
  }
  .nav-fixed .menus-btn a:hover,
  .nav-fixed .menus-item a:hover {
    color: #49b1f5 !important;
  }
  .menus-item a:hover:after {
    width: 100%;
  }
  .menus-item a:after {
    position: absolute;
    bottom: -0.0926rem;
    left: 0;
    z-index: -1;
    width: 0;
    height: 0.0556rem;
    background-color: #80c8f8;
    content: "";
    transition: all 0.3s ease-in-out;
  }
  .user-btn a {
    transition: all 0.2s;
  }
  .user-avatar {
    cursor: pointer;
    border-radius: 50%;
  }
  .user-btn:hover .user-submenu {
    display: block;
  }
  .user-submenu {
    position: absolute;
    display: none;
    right: 0;
    width: max-content;
    margin-top: 1.5%;
    box-shadow: 0 0.0926rem 0.3704rem -4px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    animation: submenu 0.3s 0.1s ease both;
  }
  .user-submenu:before {
    position: absolute;
    top: -0.148rem;
    left: 0;
    width: 100%;
    height: 1.5%;
    content: "";
  }
  .user-submenu a {
    line-height: 2;
    color: #4c4948 !important;
    text-shadow: none;
    display: block;
    padding: 6px 14px;
  }
  .user-submenu a:hover {
    background: #4ab1f4;
  }
  @keyframes submenu {
    0% {
      opacity: 0;
      filter: alpha(opacity=0);
      transform: translateY(0.1852rem);
    }
    100% {
      opacity: 1;
      filter: none;
      transform: translateY(0);
    }
  }

  .com-navigation, .com-navigation .container {
    height: 1.185rem;
    line-height: 1.185rem;
    background: #1b2327;
  }
  .com-navigation {
    position: relative;
  }

  .com-navigation, .com-navigation .container {
    height: 1.185rem;
    line-height: 1.185rem;
    background: #1b2327;
  }

    .container {
      width: 990px;
    }

  .container {
    width: 22.963rem;
    margin: 0 auto;
  }

  .com-navigation, .com-navigation .container {
    height: 1.185rem;
    line-height: 1.185rem;
    background: #1b2327;
  }

  .com-navigation .nav-list {
    float: left;
    font-size: 0;
  }
  .clear {
    clear: both;
  }

  .clear:after {
      content: "\20";
      display: block;
      height: 0;
      clear: both;
    }
  .com-navigation .nav-list .nav-li {
    display: inline-block;
    float: left;
    font-size: 14px;
    height: 1.185rem;
    line-height: 1.185rem;
    position: relative;
  }
  .com-navigation .nav-list {
    float: left;
    font-size: 0;
  }

  .com-navigation .nav-list .nav-li-menu .more-menu {
    display: inline-block;
    vertical-align: middle;
    width: 1.5%;
    height: 1.5%;
    background: url(//res.orayimg.com/open/1.0/img/icon_menu.39b28d0.png) no-repeat 50%;
    background-position: 0 0;
    padding-left: 0;
  }
  .com-navigation .nav-list .nav-li-menu .slidedown-list {
    width: 180px;
  }

  .com-navigation .nav-list .nav-li .slidedown-list {
    overflow: hidden;
    position: absolute;
    top: 1.185rem;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 99;
    border-radius: 0 0 4px 4px;
    min-width: 2.407rem;
    display: none;
    padding: 0.148rem 0;
    box-shadow: 0 0.037rem 0.222rem 0 rgba(0,0,0,.1);
  }
  .com-navigation .nav-list .nav-li .slidedown-list li {
    height: 0.7407rem;
    line-height: 0.7407rem;
  }
  .com-navigation .nav-list .nav-li-menu .slidedown-list li a {
    padding-left: 0.296rem;
  }
  .com-navigation .nav-list .nav-li .slidedown-list li a {
    color: #333;
    padding-left: 0.296rem;
    height: 0.7407rem;
    line-height: 0.7407rem;
    font-size: 14px;
    position: relative;
  }
  .com-navigation .nav-list .nav-li-line {
    position: relative;
  }
  .com-navigation .nav-list .nav-li {
    display: inline-block;
    float: left;
    font-size: 14px;
    height: 1.185rem;
    line-height: 1.185rem;
    position: relative;
  }
  .com-navigation .nav-list .nav-li-line:after {
    content: "";
    position: absolute;
    top: 22.5px;
    left: 50%;
    margin-left: -0.0926rem;
    height: 0.3704rem;
    width: 0.0185rem;
    background: #ccc\9;
    background: hsla(0,0%,100%,.2);
  }
  .com-navigation .nav-list .nav-li-line {
    position: relative;
  }
  .com-navigation .nav-list .nav-li-line:after {
    content: "";
    position: absolute;
    top: 22.5px;
    left: 50%;
    margin-left: -0.0926rem;
    height: 0.3704rem;
    width: 0.0185rem;
    background: #ccc\9;
    background: hsla(0,0%,100%,.2);
  }
  .com-navigation .nav-list .nav-li {
    display: inline-block;
    float: left;
    font-size: 14px;
    height: 1.185rem;
    line-height: 1.185rem;
    position: relative;
  }
  .com-navigation .nav-list .nav-li a.active, .com-navigation .nav-list .nav-li a.nuxt-link-exact-active {
    position: relative;
    color: #339cff;
  }

  .com-navigation .nav-logo-wrap .nav-logo {
    text-decoration:none;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(//res.orayimg.com/open/1.0/img/logo_developer.8b40e45.png) no-repeat;
    background-position: 0 0;
    margin-right: 0.148rem;
  }
  .nav-logo-system {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(../../assets/img/home.png) no-repeat;
    background-position: 0 0;
    margin-right: 0.148rem;
  }
</style>
