<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>视频分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--视频分类卡片-->
    <el-card class="box-card" >
      <el-form :inline="true" class="demo-form-inline">
        <el-row type="flex" justify="start">
          <el-form-item style="margin-left: 10px">
            <el-button type="warning" icon="el-icon-plus" @click="addDialogVisible = true">添加</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!--商品分类表格-->
      <el-table
        max-height="369px"
        :data="sortList"
        @row-dblclick='handleTaskItemClick'
        border
        style="width: 450px">
        <el-table-column
          prop="sortId"
          label="分类编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="sortName"
          label="分类名称"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
<!--            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.sortId)"></el-button>-->
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeSortById(scope.row.sortName)"></el-button>
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
          :page-sizes="[2, 6, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

    <!--添加分类的对话框-->
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addRuleForm" label-width="70px">
        <el-form-item label="名称" prop="sortname">
          <el-input v-model="addForm.sortname" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addSort">确定</el-button>
      </span>
    </el-dialog>

    <!--修改分类的对话框-->
    <el-dialog title="修改分类信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="90px">
        <el-form-item label="分类编号">
          <el-input v-model="editForm.sortId" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="sortName">
          <el-input v-model="editForm.sortName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="editForm.sortStartTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editForm.sortRemakes"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editSortInfo">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { findSortList, addNewSort, deleteSort } from '../../api/system'

export default {
  name: 'Sort',
  data () {
    return {
      // 分类集合
      sortList: [],
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      // 当前页
      current: 1,
      // 控制添加分类对话框的显示和隐藏
      addDialogVisible: false,
      // 添加分类的表单数据
      addForm: {
        sortname: '',
        sortremake: ''
      },
      // 添加分类表单数据的规则
      addFormRules: {
        sortname: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 控制修改分类对话框的显示和隐藏
      editDialogVisible: false,
      // 查询到的分类信息
      editForm: {},
      // 修改分类表单的验证规则
      editFormRules: {
        sortName: [
          { required: true, message: '分类名字不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getSortList()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 将val赋值给size
      this.pageSize = val
      // 重新从后台查询数据
      this.getSortList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.current = val
      this.getSortList()
    },
    // 获取视频对应所有第一分类
    async getSortList () {
      const { data } = await findSortList(this.current, this.pageSize)
      this.sortList = data.data.SortLevelOne
      this.total = data.data.total
    },
    // 添加分类的提交表单
    addSort () {
      this.$refs.addRuleForm.validate(async valid => {
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // 可以发起添加分类的网络请求
        // eslint-disable-next-line no-unused-vars
        const { data } = await addNewSort(this.addForm.sortname)
        console.log(data.data)
        this.getSortList()
        this.$message.success('添加分类成功')
        this.addForm.sortname = ''
        this.addDialogVisible = false
      })
    },
    // 根据Id删除对应的分类信息
    async removeSortById (sortName) {
      // 弹框提示
      // eslint-disable-next-line no-unused-vars
      const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果点击确定返回字符串 confirm
      // 如果点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      // eslint-disable-next-line no-unused-vars
      const { data } = await deleteSort(sortName)
      console.log(data)
      if (data.code !== 200) {
        return this.$message.error('删除分类失败')
      }
      this.$message.success('删除分类成功')
      this.getSortList()
      this.getSortList()
    },
    handleTaskItemClick (e) {
      // this.$router.push({ path: '/myAss/' + e.assId + '/activity', query: { name: e.sortId, state: '已通过', success: 0 } })
      this.$router.push({ path: '/sortData/' + e.sortId + '/SecondLevel', query: { sort: e } })
    }
  }
}
</script>

<style scoped>

</style>
