<template>
  <div id="app" class="myhome" >
    <div class="home-banner">
      <div class="banner-container">
        <p class="home-title" style="color: whitesmoke">
          Data Retrieval
        </p>
<!--        &lt;!&ndash; 联系方式 &ndash;&gt;-->
<!--        <div class="blog-contact animated zoomIn">-->
<!--          <a class="github circular icon button" data-content="https://github.com/zhangjunze1/salmonella_show_system" data-position="bottom center" style="margin-right: 0.9259rem"><i class="github icon"></i></a>-->
<!--          <a class="wechat circular icon button" style="margin-right: 0.9259rem"><i class="weixin icon"></i></a>-->
<!--          <a class="qq circular icon button" data-content="412057605" data-position="bottom center"><i class="qq icon"></i></a>-->
<!--        </div>-->

<!--        &lt;!&ndash; 向下滚动 &ndash;&gt;-->
<!--        <div class="scroll-down" @click="scrollDown">-->
<!--          <h4><i class="el-icon-arrow-down" style="color: whitesmoke"></i></h4>-->
<!--        </div>-->
      </div>
    </div>

    <div class="m-home">
      <div class="container">
<!--        <p class="home-title" style="color: black;text-align: center">-->
<!--          Data Retrieval-->
<!--        </p>-->
        <el-form ref="form" :model="form" label-width="2.037rem" size="mini" >
          <el-row type="flex" justify="start">
            <el-form-item prop="Serotype" label="Serotype:">
              <el-select v-model="form.Serotype">
                <el-option
                  v-for="item in serotypeList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="year" label="Year:">
              <el-select v-model="form.Year">
                <el-option
                  v-for="item in YearList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="Province" label="Province:">
              <el-select v-model="form.Province">
                <el-option
                  v-for="item in ProvinceList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 1.5%"  >
              <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
              <el-button class="btn-my" icon="el-icon-search" @click="getQuery">查询</el-button>
              <el-button>
              <download-excel
                class   = "btn-my"
                :data   = "json_data"
                :fields = "json_fields"
                worksheet = "My Worksheet"
                type    = "csv"
                name    = "Dna.xls"
                @click.native="downloadCsv">
                下载文件
              </download-excel>
              </el-button>
<!--              <el-button icon="el-icon-download" @click="downloadCsv">下载文件</el-button>-->
            </el-form-item>
          </el-row>
        </el-form>
        <!--          :scroll-width="5000"-->
        <ve-table
          :columns="columns"
          :row-style-option="rowStyleOption"
          :cell-selection-option="cellSelectionOption"
          rowKeyFieldName="id"
          :border-around="true"
          :border-x="false"
          :border-y="true"
          :table-data="tableData"
          row-key-field-name="id"
          :checkbox-option="checkboxOption"
          v-if="whichTable==1"
          style="margin-left: -7%;margin-right: -7%"
        />
        <div class="table-pagination" v-if="whichTable==1"  >
          <ve-pagination
            :total="totalCount"
            :page-index="pageIndex"
            :page-size="pageSize"
            @on-page-number-change="pageNumberChange"
            @on-page-size-change="pageSizeChange"
          />
        </div>
        <ve-table
          :columns="columns0"
          :row-style-option="rowStyleOption"
          :cell-selection-option="cellSelectionOption"
          rowKeyFieldName="id"
          :border-around="true"
          :border-x="false"
          :border-y="true"
          :table-data="tableData"
          row-key-field-name="id"
          :checkbox-option="checkboxOption"
          v-if="whichTable==0"
          style="margin-left: -7%;margin-right: -7%"
        />
        <div class="table-pagination" v-if="whichTable==0">
          <ve-pagination
            :total="totalCount"
            :page-index="pageIndex"
            :page-size="pageSize"
            @on-page-number-change="pageNumberChange"
            @on-page-size-change="pageSizeChange"
          />
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../../components/layout/Footer'
import {
  DownloadDataRetrievalList,
  findDataRetrievalList,
  findDownloadDataRetrievalList,
  findInitDataList
} from '@/api/system'
// import { saveAs } from 'file-saver'
export default {
  name: 'dataQuery',
  // 注册组件
  components: {
    Footer
  },
  data () {
    return {
      json_fields: {},
      json_data: {},
      whichTable: 2,
      form: {
        Serotype: '',
        Year: '',
        Province: ''
      },
      serotypeList: [],
      YearList: [],
      ProvinceList: [],
      // page index
      pageIndex: 1,
      totalCount: 100,
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true
      },
      cellSelectionOption: {
        // default true
        enable: true
      },
      // page size
      pageSize: 10,
      checkboxOption: {
        // row select change event
        selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
          console.log(row, isSelected, selectedRowKeys)
        },
        // selected all change event
        selectedAllChange: ({ isSelected, selectedRowKeys }) => {
          console.log(isSelected, selectedRowKeys)
        }
      },
      columns: [
        { field: 'id', key: 'a', title: 'id', align: 'center' },
        { field: 'name', key: 'b', title: 'name', align: 'center' },
        { field: 'bacteria', key: 'c', title: 'bacteria', align: 'center' },
        { field: 'serotype', key: 'd', title: 'serotype', align: 'center' },
        { field: 'st', key: 'e', title: 'st', align: 'center' },
        { field: 'host', key: 'f', title: 'host', align: 'center' },
        { field: 'year', key: 'g', title: 'year', align: 'center' },
        { field: 'country', key: 'h', title: 'country', align: 'center' },
        { field: 'province', key: 'i', title: 'province', align: 'center' },
        { field: 'continent', key: 'j', title: 'continent', align: 'center' },
        { field: 'samplingType', key: 'k', title: 'samplingType', align: 'center' },
        { field: 'samplingTime', key: 'l', title: 'samplingTime', align: 'center' },
        { field: 'samplePlace', key: 'm', title: 'samplePlace', align: 'center' },
        { field: 'disease', key: 'n', title: 'disease', align: 'center' },
        { field: 'gender', key: 'o', title: 'gender', align: 'center' },
        { field: 'age', key: 'p', title: 'age', align: 'center' },
        { field: 'city', key: 'q', title: 'city', align: 'center' },
        { field: 'whetherMic', key: 'r', title: 'whetherMic', align: 'center' },
        { field: 'enr', key: 's', title: 'enr', align: 'center' },
        { field: 'ofl', key: 't', title: 'ofl', align: 'center' },
        { field: 'amp', key: 'u', title: 'amp', align: 'center' },
        { field: 'gen', key: 'v', title: 'gen', align: 'center' },
        { field: 'kan', key: 'w', title: 'kan', align: 'center' },
        { field: 'tet', key: 'x', title: 'tet', align: 'center' },
        { field: 'azi', key: 'y', title: 'azi', align: 'center' },
        { field: 'nal', key: 'z', title: 'nal', align: 'center' },
        { field: 'cip', key: 'aa', title: 'cip', align: 'center' },
        { field: 'chl', key: 'ab', title: 'chl', align: 'center' },
        { field: 'sxt', key: 'ac', title: 'sxt', align: 'center' },
        { field: 'str', key: 'ad', title: 'str', align: 'center' },
        { field: 'amc', key: 'ae', title: 'amc', align: 'center' },
        { field: 'siz', key: 'af', title: 'siz', align: 'center' },
        { field: 'cf', key: 'ag', title: 'cf', align: 'center' },
        { field: 'cef', key: 'ah', title: 'cef', align: 'center' },
        { field: 'cx', key: 'ai', title: 'cx', align: 'center' },
        { field: 'col', key: 'aj', title: 'col', align: 'center' },
        { field: 'mpn', key: 'ak', title: 'mpn', align: 'center' },
        { field: 'aorc', key: 'al', title: 'aorc', align: 'center' },
        { field: 'spt', key: 'am', title: 'spt', align: 'center' },
        { field: 'ffc', key: 'an', title: 'ffc', align: 'center' },
        { field: 'sf', key: 'ao', title: 'sf', align: 'center' },
        { field: 'caz', key: 'ap', title: 'caz', align: 'center' },
        { field: 'mem', key: 'aq', title: 'mem', align: 'center' },
        { field: 'apr', key: 'ar', title: 'apr', align: 'center' },
        { field: 'cl', key: 'as', title: 'cl', align: 'center' },
        { field: 'meq', key: 'at', title: 'meq', align: 'center' },
        { field: 'tri', key: 'au', title: 'tri', align: 'center' },
        { field: 'sul', key: 'av', title: 'sul', align: 'center' },
        { field: 'amo', key: 'aw', title: 'amo', align: 'center' },
        { field: 'cla', key: 'ax', title: 'cla', align: 'center' },
        { field: 'ipm', key: 'ay', title: 'ipm', align: 'center' },
        { field: 'amk', key: 'az', title: 'amk', align: 'center' },
        { field: 'cfz', key: 'aaa', title: 'cfz', align: 'center' },
        { field: 'atm', key: 'aab', title: 'atm', align: 'center' },
        { field: 'otc', key: 'aac', title: 'otc', align: 'center' },
        { field: 'pmb', key: 'aad', title: 'pmb', align: 'center' },
        { field: 'fis', key: 'aae', title: 'fis', align: 'center' },
        { field: 'xnl', key: 'aaf', title: 'xnl', align: 'center' },
        { field: 'whetherJoiningTogether', key: 'aah', title: 'whetherJoiningTogether', align: 'center' },
        { field: 'sequencingFileDownloadLink', key: 'aai', title: 'sequencingFileDownloadLink', align: 'center' },
        { field: 'cgmlst', key: 'aaj', title: 'cgmlst', align: 'center' },
        { field: 'resfinder', key: 'aak', title: 'resfinder', align: 'center' },
        { field: 'vfdb', key: 'aal', title: 'vfdb', align: 'center' }
      ],
      tableData: [],
      columns0: [
        { field: 'id', key: 'a', title: 'id', align: 'center' },
        { field: 'name', key: 'b', title: 'name', align: 'center' },
        { field: 'bacteria', key: 'c', title: 'bacteria', align: 'center' },
        { field: 'serotype', key: 'd', title: 'serotype', align: 'center' },
        { field: 'st', key: 'e', title: 'st', align: 'center' },
        { field: 'host', key: 'f', title: 'host', align: 'center' },
        { field: 'year', key: 'g', title: 'year', align: 'center' },
        { field: 'country', key: 'h', title: 'country', align: 'center' },
        { field: 'province', key: 'i', title: 'province', align: 'center' },
        { field: 'continent', key: 'j', title: 'continent', align: 'center' },
        { field: 'whetherMic', key: 'r', title: 'whetherMic', align: 'center' },
        { field: 'enr', key: 's', title: 'enr', align: 'center' },
        { field: 'ofl', key: 't', title: 'ofl', align: 'center' },
        { field: 'amp', key: 'u', title: 'amp', align: 'center' },
        { field: 'gen', key: 'v', title: 'gen', align: 'center' },
        { field: 'kan', key: 'w', title: 'kan', align: 'center' },
        { field: 'tet', key: 'x', title: 'tet', align: 'center' },
        { field: 'azi', key: 'y', title: 'azi', align: 'center' },
        { field: 'nal', key: 'z', title: 'nal', align: 'center' },
        { field: 'cip', key: 'aa', title: 'cip', align: 'center' },
        { field: 'chl', key: 'ab', title: 'chl', align: 'center' },
        { field: 'sxt', key: 'ac', title: 'sxt', align: 'center' },
        { field: 'str', key: 'ad', title: 'str', align: 'center' },
        { field: 'amc', key: 'ae', title: 'amc', align: 'center' },
        { field: 'siz', key: 'af', title: 'siz', align: 'center' },
        { field: 'cf', key: 'ag', title: 'cf', align: 'center' },
        { field: 'cef', key: 'ah', title: 'cef', align: 'center' },
        { field: 'cx', key: 'ai', title: 'cx', align: 'center' },
        { field: 'col', key: 'aj', title: 'col', align: 'center' },
        { field: 'mpn', key: 'ak', title: 'mpn', align: 'center' },
        { field: 'aorc', key: 'al', title: 'aorc', align: 'center' },
        { field: 'spt', key: 'am', title: 'spt', align: 'center' },
        { field: 'ffc', key: 'an', title: 'ffc', align: 'center' },
        { field: 'sf', key: 'ao', title: 'sf', align: 'center' },
        { field: 'caz', key: 'ap', title: 'caz', align: 'center' },
        { field: 'mem', key: 'aq', title: 'mem', align: 'center' },
        { field: 'apr', key: 'ar', title: 'apr', align: 'center' },
        { field: 'cl', key: 'as', title: 'cl', align: 'center' },
        { field: 'meq', key: 'at', title: 'meq', align: 'center' },
        { field: 'tri', key: 'au', title: 'tri', align: 'center' },
        { field: 'sul', key: 'av', title: 'sul', align: 'center' },
        { field: 'amo', key: 'aw', title: 'amo', align: 'center' },
        { field: 'cla', key: 'ax', title: 'cla', align: 'center' },
        { field: 'ipm', key: 'ay', title: 'ipm', align: 'center' },
        { field: 'amk', key: 'az', title: 'amk', align: 'center' },
        { field: 'cfz', key: 'aaa', title: 'cfz', align: 'center' },
        { field: 'atm', key: 'aab', title: 'atm', align: 'center' },
        { field: 'otc', key: 'aac', title: 'otc', align: 'center' },
        { field: 'pmb', key: 'aad', title: 'pmb', align: 'center' },
        { field: 'fis', key: 'aae', title: 'fis', align: 'center' },
        { field: 'xnl', key: 'aaf', title: 'xnl', align: 'center' },
        { field: 'whetherJoiningTogether', key: 'aah', title: 'whetherJoiningTogether', align: 'center' },
        { field: 'sequencingFileDownloadLink', key: 'aai', title: 'sequencingFileDownloadLink', align: 'center' },
        { field: 'cgmlst', key: 'aaj', title: 'cgmlst', align: 'center' },
        { field: 'resfinder', key: 'aak', title: 'resfinder', align: 'center' },
        { field: 'vfdb', key: 'aal', title: 'vfdb', align: 'center' }
      ]
    }
  },
  created () {
    this.ifCanVisit()
    this.getSerotypeList()
    this.getQuery()
  },
  methods: {
    // page number change
    pageNumberChange (pageIndex) {
      this.pageIndex = pageIndex
      this.getQuery()
    },
    // page size change
    pageSizeChange (pageSize) {
      this.pageIndex = 1
      this.pageSize = pageSize
      this.getQuery()
    },
    // 初始化
    scrollDown () {
      window.scrollTo({
        behavior: 'smooth',
        top: document.documentElement.clientHeight
      })
    },
    async downloadCsv () {
      const { data } = await findDownloadDataRetrievalList(this.form.Year, this.form.Province, this.form.Serotype, window.sessionStorage.getItem('invitationCode'))
      this.json_data = data.data.geneSequencing
      console.log(1)
      console.log(this.json_data)
      this.json_fields = data.data.className
      console.log(this.json_fields)
    },
    async downloadData () {
      const { data } = await DownloadDataRetrievalList(this.pageIndex, this.pageSize, this.form.Year, this.form.Province, this.form.Serotype, window.sessionStorage.getItem('invitationCode'))
      console.log(data)
      this.saveFile(data, 'DNA.xls')
    },
    saveFile (data, name) {
      try {
        const blobUrl = window.URL.createObjectURL(data)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.download = name
        a.type = 'csv'
        a.href = blobUrl
        a.click()
      } catch (e) {
        alert('保存文件出错')
      }
    },
    async ifCanVisit () {
      if (window.sessionStorage.getItem('id') === null) {
        const confirmResult = await this.$confirm('您尚未登录，无权限访问数据检索页，是否将以游客方式登录？', '提示', {
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
    async getSerotypeList () {
      const { data } = await findInitDataList(window.sessionStorage.getItem('invitationCode'))
      this.serotypeList = data.data.Serotypes
      this.YearList = data.data.years
      this.ProvinceList = data.data.provinces
    },
    async getQuery () {
      const { data } = await findDataRetrievalList(this.pageIndex, this.pageSize, this.form.Year, this.form.Province, this.form.Serotype, window.sessionStorage.getItem('invitationCode'))
      this.totalCount = data.data.total
      this.tableData = data.data.geneSequencing
      this.whichTable = data.data.permission
      this.tableData.forEach((item, i) => {
        if (item.disease === '无权限') {
          item.age = '无权限'
          item.samplingTime = '无权限'
        }
      })
      // for (tabledata in this.tableData) {
      //   if (tabledata.disease === '无权限') {
      //     this.tabledata.age = '无权限'
      //   }
      // }
    },
    resetForm () {
      this.form.Province = ''
      this.form.Year = ''
      this.form.Serotype = ''
      this.getSerotypeList()
      this.getQuery()
    }
  }
}
</script>

<style scoped>
.m-home {
  padding-top: 5% !important;
  padding-bottom: 0px !important;
  width: 100%;
}
.home-title {
  font-size: 20px;
}
.home-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5%;
  /*  background: #EEEEEE;*/
  /* background: url("../assets/img/system.jpg") center center /*/
  /*cover no-repeat;*/
  background-color: #1b2327;
  background-attachment: fixed;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s !important;
}
.banner-container {
  min-height: 100%;
  margin-top: 0.5%;
  line-height: 1.5;
  color: black;
  width: 100%;
}
.blog-contact a {
  color: #fff !important;
}
.scroll-down {
  cursor: pointer;
  position: absolute;
  bottom: -3.958%;
  width: 100%;
}
.scroll-down i {
  font-size: 0.75rem;
}
body {
  background: url("../../assets/img/bg.png");
}

.container {
  min-width: 1400px;
  width: 90%;
}
.page-index .section-title {
  font-size: 0.556rem;
  color: #333;
  letter-spacing: 0.574rem;
  text-align: center;
  line-height: 3%;
}
.table-pagination {
  margin-top: 3%;
  text-align: right;
}
</style>
