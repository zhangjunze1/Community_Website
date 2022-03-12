<template>
  <div id="navClass" class="navClass" hide-on-scroll flat height="58">
    <!-- 电脑导航栏 -->
    <div class="d-md-block d-none nav-container">
      <div class="float-left blog-title">
<!--        <router-link to="/">-->
<!--        </router-link>-->
      </div>
      <div class="float-right nav-title">
        <div class="menus-item" style="min-width: 50%">
          <router-link to="/adminLogin">
            <i class="iconfont2 iconzhuye" style="color: whitesmoke" /><span style="color: black;margin-right: 1.04%;min-width: 200%">后台管理系统</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  created () {
  },
  mounted () {
    // window.addEventListener('scroll', this.scroll)
  },
  // data: function () {
  //   return {
  //
  //   }
  // },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {

  }
}
</script>

<style scoped>
  .navClass{
    /*position:fixed; !* 绝对定位，fixed是相对于浏览器窗口定位。 *!*/
    position: relative;
    top:3%; /* 距离窗口顶部距离 */
    right: 2%;
    height: 1%; /* 高度 */
    float: right;
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
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
    margin-top: 0.148rem;
    box-shadow: 0 0.0926rem 0.3704rem -4px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    animation: submenu 0.3s 0.1s ease both;
  }
  .user-submenu:before {
    position: absolute;
    top: -0.148rem;
    left: 0;
    width: 100%;
    height: 0.3704rem;
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
</style>
