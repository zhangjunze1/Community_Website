<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main2' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>视频数据</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row type="flex" justify="start">
          <el-form-item label="" style="margin-left: 10px">
            <el-input clearable style="width: 400px" v-model="formInline.research" placeholder="输入您感兴趣的内容"></el-input>
          </el-form-item>
          <el-form-item label="分类" style="margin-left: 10px">
            <el-select v-model="formInline.sortName" clearable placeholder="请选择分类">
              <el-option
                v-for="item in sortList"
                :key="item.sortId"
                :label="item.sortName"
                :value="item.sortName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="formInline.sortName!=''" label="子分类" style="margin-left: 10px">
            <el-select v-model="formInline.subSortName" placeholder="请选择子分类">
              <el-option
                v-for="item in secondSortList"
                :key="item.sortId"
                :label="item.sortName"
                :value="item.sortName">
                <span style="float: left">{{ item.sortName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">
                  <span class="el-tag el-tag--success el-tag--mini el-tag--plain">{{ item.userCount }}</span>
                </span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 10px"  >
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="getVideoList">查询</el-button>
            <el-button type="warning" icon="el-icon-plus" @click="handleTaskItemClick">发布视频</el-button>
          </el-form-item>
        </el-row>
      </el-form>

      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="videoLists"
        @row-dblclick='showSignatureClick'
        border
        max-height="369px"
        style="width: 100%;">
        <el-table-column
          prop="videoId"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="videoSub"
          label="视频主题"
          width="200">
        </el-table-column>
        <el-table-column
          prop="videoUserName"
          label="作者"
          width="100">
        </el-table-column>
        <el-table-column
          prop="videoAgree"
          label="点赞数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="videoComment"
          label="评论数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="videoViewNum"
          label="观看数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="videoTime"
          label="发布时间"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作">
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

<!--    &lt;!&ndash;添加分类的对话框&ndash;&gt;-->
<!--    <el-dialog title="添加视频" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">-->
<!--      &lt;!&ndash;内容主体区域&ndash;&gt;-->
<!--      <el-form :model="addForm" :rules="addFormRules" ref="addRuleForm" label-width="70px">-->
<!--        <el-form-item label="主题" prop="title">-->
<!--          <el-input v-model="addForm.videoSub" placeholder="请输入发布视频主题"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="视频介绍">-->
<!--          <el-input v-model="addForm.videoDescribe"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="活动区域">-->
<!--          <el-select v-model="addForm" placeholder="请选择活动区域">-->
<!--            <el-option label="区域一" value="shanghai"></el-option>-->
<!--            <el-option label="区域二" value="beijing"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="活动时间">-->
<!--          <el-col :span="11">-->
<!--            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date1" style="width: 100%;"></el-date-picker>-->
<!--          </el-col>-->
<!--          <el-col class="line" :span="2">-</el-col>-->
<!--          <el-col :span="11">-->
<!--            <el-time-picker placeholder="选择时间" v-model="addForm.date2" style="width: 100%;"></el-time-picker>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="即时配送">-->
<!--          <el-switch v-model="addForm.delivery"></el-switch>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="活动性质">-->
<!--          <el-checkbox-group v-model="addForm.type">-->
<!--            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
<!--            <el-checkbox label="地推活动" name="type"></el-checkbox>-->
<!--            <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
<!--            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
<!--          </el-checkbox-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="特殊资源">-->
<!--          <el-radio-group v-model="addForm.resource">-->
<!--            <el-radio label="线上品牌商赞助"></el-radio>-->
<!--            <el-radio label="线下场地免费"></el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="活动形式">-->
<!--          <el-input type="textarea" v-model="addForm.desc"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--          <el-button>取消</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      &lt;!&ndash;底部区域&ndash;&gt;-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="addDialogVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click="addSort">确定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->

  </div>
</template>

<script>

import { findSecondSortList1, findSortList1, findVideoList } from '../../api/system'
export default {
  name: 'Member',
  data () {
    return {
      formInline: {
        research: '',
        // eslint-disable-next-line no-undef
        sortName: '',
        // eslint-disable-next-line no-undef
        subSortName: ''
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
      // 视频集合
      videoLists: [],
      // Level 1 分类列表
      sortList: [],
      // 控制添加视频对话框的显示和隐藏
      addDialogVisible: false,
      // 添加视频的表单数据
      addForm: {
        sortname: '',
        sortremake: ''
      },
      // 添加视频表单数据的规则
      addFormRules: {
        sortname: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // Level 2 分类列表
      secondSortList: [],
      loading: true
    }
  },
  created () {
    this.getVideoList()
    this.getSortList()
  },
  computed: {
    getName: function () {
      return this.formInline.sortName
    }
  },
  watch: {
    formInline: {
      handler: function () {
        this.getSecondSortList()
      },
      deep: true
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    async getVideoList () {
      const { data } = await findVideoList(this.current, this.pageSize, this.formInline.subSortName, this.formInline.research)
      this.videoLists = data.data.videoList
      this.total = data.data.total
      this.loading = false
      console.log(this.videoLists)
    },
    // 当每一页条数改变的时候，
    handleSizeChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`每页 ${val} 条`)
      // 将val赋值给size
      this.pageSize = val
      // 重新去后台查询数据
      this.getVideoList()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getVideoList()
    },
    async getSortList () {
      const { data } = await findSortList1()
      this.sortList = data.data.SortLevelOne
      this.getSecondSortList()
    },
    // 获取视频对应所有第二分类
    async getSecondSortList () {
      const { data } = await findSecondSortList1(this.formInline.sortName)
      this.secondSortList = data.data.SortLevelTwo
    },
    resetForm () {
      this.formInline.research = ''
      this.formInline.sortName = ''
      this.formInline.subSortName = ''
      this.getVideoList()
    },
    handleTaskItemClick () {
      // this.$router.push({ path: '/myAss/' + e.assId + '/activity', query: { name: e.sortId, state: '已通过', success: 0 } })
      this.$router.push({ path: '/videoData/publish' })
    },
    showSignatureClick (e) {
      // this.$router.push({ path: '/myAss/' + e.assId + '/activity', query: { name: e.sortId, state: '已通过', success: 0 } })
      this.$router.push({ path: '/videoData/video', query: { video: e } })
    }
  }

}
</script>

<style scoped>

</style>
