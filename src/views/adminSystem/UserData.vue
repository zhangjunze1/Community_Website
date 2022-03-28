<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main2' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row type="flex" justify="start">
<!--          <el-form-item label="职位" style="margin-left: 10px">-->
<!--            <el-select v-model="formInline.position" placeholder="请选择职位">-->
<!--              <el-option-->
<!--                v-for="item in AuthorityAndCount"-->
<!--                :key="item.userPosition"-->
<!--                :label="item.userPosition"-->
<!--                :value="item.userPosition">-->
<!--                <span style="float: left">{{ item.userPosition }}</span>-->
<!--                <span style="float: right; color: #8492a6; font-size: 13px">-->
<!--                  <span class="el-tag el-tag&#45;&#45;success el-tag&#45;&#45;mini el-tag&#45;&#45;plain">{{ item.userCount }}</span>-->
<!--                </span>-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="用户名" style="margin-left: 10px">
            <el-input clearable v-model="formInline.userName" placeholder="输入用户名"></el-input>
          </el-form-item>
<!--          <el-form-item label="社团" style="margin-left: 10px">-->
<!--            <el-select v-model="formInline.assName" clearable placeholder="请选择社团">-->
<!--              <el-option-->
<!--                v-for="item in assList"-->
<!--                :key="item.assId"-->
<!--                :label="item.assName"-->
<!--                :value="item.assName">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item style="margin-left: 10px"  >
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="myqueryUserList">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>

      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="MemberList"
        @row-dblclick='showSignatureClick'
        border
        max-height="300px"
        style="width: 100%;">
        <el-table-column
          prop="userId"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userPassword"
          label="密码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="userNumVideo"
          label="发布视频数"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="userLikeNumVideo"
          label="点赞视频数"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="userRecentTime"
          label="最近登录时间"
          width="140">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="memberDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页功能-->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          style="padding-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[2,6,10,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script>

import { findqueryUserList } from '../../api/system'
export default {
  name: 'Member',
  data () {
    return {
      formInline: {
        // eslint-disable-next-line no-undef
        userName: ''
      },
      // userAuthority
      // userCount
      AuthorityAndCount: [],
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      // 所有人员集合
      MemberList: [],
      // 社团列表
      assList: [],
      loading: true
    }
  },
  created () {
    this.myqueryUserList()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    async myqueryUserList () {
      const { data } = await findqueryUserList(this.current, this.pageSize, this.formInline.userName)
      this.MemberList = data.data.Users
      this.total = data.data.total
      this.loading = false
      console.log('current:' + data.data.current)
      console.log('total:' + data.data.total)
      console.log(data)
    },
    // 当每一页条数改变的时候，
    handleSizeChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`每页 ${val} 条`)
      // 将val赋值给size
      this.pageSize = val
      // 重新去后台查询数据
      this.myqueryUserList()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.myqueryUserList()
    },
    resetForm () {
      this.formInline.userName = ''
      this.myqueryUserList()
    }
  }

}
</script>

<style scoped>

</style>
