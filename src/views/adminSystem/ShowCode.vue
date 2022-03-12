<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     style="padding-left: 0.1852rem;padding-bottom: 0.1852rem;font-size: 0.222rem">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>邀请码</el-breadcrumb-item>
        <el-breadcrumb-item>邀请码列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card">
      <el-form :inline="true" :model="state" class="demo-form-inline">
        <el-row type="flex" justify="start">
          <el-form-item label="邀请码状态" style="margin-left: 0.1852rem">
            <el-select v-model="state" clearable placeholder="请选择状态">
              <el-option label="尚未选用" value="未使用" style="color: red"></el-option>
              <el-option label="已使用" value="已使用" style="color: green"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 0.1852rem"  >
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="getInvitationCode">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    <!--表格内容显示区域-->
    <el-table
      v-loading="loading"
      :data="CodeList"
      border
      max-height="7.037rem"
      style="width: 100%;">
      <el-table-column
        prop="invitationCode"
        label="邀请码"
        width="100">
      </el-table-column>
      <el-table-column
        prop="number"
        label="省份数量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="state"
        label="邀请码状态"
        width="150">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份权限"
      >
      </el-table-column>
    </el-table>
    <!--分页功能-->
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        style="padding-top: 0.3704rem"
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
import { findInvitationCode } from '../../api/code'
export default {
  name: 'Code',
  data () {
    return {
      state: '',
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      loading: true,
      CodeList: []
    }
  },
  created () {
    this.getInvitationCode()
  },
  methods: {
    // 当每一页条数改变的时候，
    handleSizeChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`每页 ${val} 条`)
      // 将val赋值给size
      this.pageSize = val
      // 重新去后台查询数据
      this.getInvitationCode()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getInvitationCode()
    },
    resetForm () {
      this.state = ''
      this.getInvitationCode()
    },
    async getInvitationCode () {
      const { data } = await findInvitationCode(this.current, this.pageSize, this.state)
      this.CodeList = data.data.invitationCode
      this.total = data.data.total
      this.loading = false
      console.log('current:' + data.data.current)
      console.log('total:' + data.data.total)
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
