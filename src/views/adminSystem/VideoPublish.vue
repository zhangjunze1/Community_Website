<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main2' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>视频数据</el-breadcrumb-item>
        <el-breadcrumb-item>发布视频</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <el-form ref="form" :model="form" :rules="addFormRules" label-width="80px">
        <el-form-item label="主题">
          <el-input style="width: 400px" v-model="form.videoSub"></el-input>
        </el-form-item>
        <el-form-item label="视频简介">
          <el-input type="textarea" v-model="form.videoDescribe"></el-input>
        </el-form-item>
        <el-form-item label="视频上传" prop="videoUrl" ref="uploadElement">
<!--          <el-upload-->
<!--            action="http://localhost:8085/oss/uploadVideoFile"-->
<!--            :http-request="upload"-->
<!--          >-->
<!--            <div class="el-upload__tip" slot="tip">只能上传视频文件，且不超过500MB</div>-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--          </el-upload>-->
          <el-upload class="avatar-uploader"
                     action="http://localhost:8085/oss/uploadVideoFile"
                     v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                     v-bind:on-progress="uploadVideoProcess"
                     v-bind:on-success="handleVideoSuccess"
                     v-bind:before-upload="beforeUploadVideo"
                     v-bind:show-file-list="false">
            <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                   v-bind:src="videoForm.showVideoPath"
                   class="avatar video-avatar"
                   controls="controls">
              您的浏览器不支持视频播放
            </video>
            <i v-else-if="videoForm.showVideoPath =='' && !videoFlag"
               class="el-icon-plus avatar-uploader-icon"></i>
            <el-progress v-if="videoFlag == true"
                         type="circle"
                         v-bind:percentage="videoUploadPercent"
                         style="margin-top:7px;"></el-progress>
            <div class="el-upload__tip" slot="tip">只能上传视频文件，且不超过500MB</div>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类">
          <el-checkbox-group  v-model="form.mainSort">
            <el-checkbox v-for="(item,index) in sortList" :key="index" :label="item.sortName" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addNewVideo">立即创建</el-button>
          <el-button type="" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>

import { addNewVideo, addVideo, findSecondSortListAll } from '../../api/system'
export default {
  name: 'Member',
  data: function () {
    return {
      form: {
        videoSub: '',
        mainSort: [],
        videoDescribe: '',
        videoUrl: ''
      },
      addFormRules: {
        videoSub: [
          { required: true, message: '主题不能为空', trigger: 'blur' }
        ],
        videoDescribe: [
          { required: true, message: '视频简介不能为空', trigger: 'blur' }
        ],
        videoUrl: [
          { required: true, message: '请上传视频', trigger: 'blur' }
        ]
      },
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      },
      sortList: [],
      sortString: ''
    }
  },
  created () {
    this.getSortList()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onSubmit () {
      console.log(this.form.videoUrl)
      console.log('submit!')
    },
    // 上传前回调
    beforeUploadVideo (file) {
      var fileSize = file.size / 1024 / 1024 < 100
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) === -1) {
        this.$notify({
          title: '失败',
          message: '请上传正确的视频格式',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      if (!fileSize) {
        this.$notify({
          title: '失败',
          message: '视频大小不能超过100MB',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.form.videoUrl = res.data.url
      console.log(this.form.videoUrl)
    },
    handlePreview (file) {
      this.form.videoUrl = file.response.data.url
      console.log(this.form.videoUrl)
    },
    // 监听视频上传成功事件
    async handleSuccess (item) {

    },
    async upload (item) {
      console.log(item)
      var formData = new FormData()
      formData.append('file', item.file)
      const { data } = await addVideo(formData)
      this.form.videoUrl = data.data.url
      console.log(this.form.videoUrl)
    },
    async getSortList () {
      const { data } = await findSecondSortListAll()
      this.sortList = data.data.SortLevelSec
      this.total = data.data.total
    },
    async addNewVideo () {
      this.form.mainSort.forEach((item, index) => {
        this.sortString = this.sortString + item + ' '
      })
      console.log(this.sortString)
      const { data } = await addNewVideo(this.form.videoSub, this.form.videoDescribe, this.sortString, this.form.videoUrl, this.$root.ADMIN.name)
      console.log(data)
      if (data.code === 200) {
        this.$notify({
          title: '成功',
          message: '成功发布视频',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '失败',
          message: '发布视频失败',
          type: 'warning',
          duration: 2000
        })
      }
      this.goBack()
    }
  }

}
</script>

<style scoped>

</style>
