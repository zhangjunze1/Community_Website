<template>
  <div>
    <template>

      <el-menu-item index="/host" >
        <i class="el-icon-s-home"></i>
        <span slot="title">主界面</span>
      </el-menu-item>

      <el-submenu index="/Code">
        <template slot="title">
          <i class="el-icon-help"></i>
          <span>邀请码</span>
        </template>
        <el-menu-item index="/invitationCode" >
          <i class="el-icon-collection-tag"></i>
          <span slot="title">邀请码生成</span>
        </el-menu-item>
        <el-menu-item index="/showCode">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">邀请码列表</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/Manager">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>管理数据（old）</span>
        </template>
        <el-menu-item index="/data">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">视频数据</span>
        </el-menu-item>
        <el-menu-item index="/science">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">用户</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/DataManager">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item index="/VideoData">
          <i class="el-icon-camera-solid"></i>
          <span slot="title">视频数据</span>
        </el-menu-item>
        <el-menu-item index="/sortData">
          <i class="el-icon-sort"></i>
          <span slot="title">视频分类</span>
        </el-menu-item>
        <el-menu-item index="/UserData">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户</span>
        </el-menu-item>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree'
}
</script>

<style scoped>
/*实现了溢出处理*/
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
