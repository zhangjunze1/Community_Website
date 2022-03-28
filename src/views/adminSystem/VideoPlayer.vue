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

    <el-page-header style="margin-top: 10px" @back="goBack" :content="this.$route.query.name" >
    </el-page-header>
    <div class="test">
      <div class="content">
        <div class="card">
          <img class="titlepic" src="this.list.picsrc" >
          <div class="title">
            {{ this.list.title }}
          </div>
          <div class="titleinfo">
            <div class="titleinfo-left">
              <img class="avatar" :src="this.list.avatarsrc">
              <div class="username">{{ this.list.username }}</div>
            </div>
            <div class="titleinfo-right">
              <div class="time">{{this.list.time}}</div>
            </div>
          </div>
        </div>
<!--        <div class="card" v-for="(item,index) in list" :key="index">-->
<!--          <img class="titlepic" :src="item.picsrc" >-->
<!--          <div class="title">-->
<!--            {{ item.title }}-->
<!--          </div>-->
<!--          <div class="titleinfo">-->
<!--            <div class="titleinfo-left">-->
<!--              <img class="avatar" :src="item.avatarsrc">-->
<!--              <div class="username">{{ item.username }}</div>-->
<!--            </div>-->
<!--            <div class="titleinfo-right">-->
<!--              <div class="time">{{item.time}}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
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

  </div>
</template>

<script>

import { findSecondSortList1, findSortList1, findVideoList } from '../../api/system'
export default {
  name: 'Member',
  data () {
    return {
      list: {
        picsrc: this.$route.query.video.videoUrl,
        title: '测试测试测试测试测试测试测试测试测试',
        username: '啊吧啊吧',
        avatarsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F18%2F20200518080041_cgwpv.thumb.1000_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650792792&t=5611a63c2547dc94d53373065f94e8a0',
        time: '一天前'
      },
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
    goBack () {
      this.$router.back()
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
.test{
  width: 100%;
  height: 100%;
  background: #333333;
}
.content{
  width: 100%;
}
.card{
  display: inline-block;
  width: 46%;
  height: 200px;
  margin: 2%;
  padding: 1%;
}
.titlepic{
  width: 98%;
  height: 50%;
}
.title{
  color: #ffffff;
  font-size: 14px;
  margin: 2% 0 0 0;
  font-weight: 500;
  height: 20%;
  width: 100%;
  word-wrap:break-word;
  overflow: hidden;
}
.titleinfo{
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.titleinfo-left{
  display: flex;
  align-items: center;
}
.titleinfo-right{
  display: flex;
  align-items: center;
}
.avatar{
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 5px;
}
.username{
  color: #ffffff;
  font-size: 12px;
}
.time{
  color: #c2c2c2;
  font-size: 12px;
}
</style>
