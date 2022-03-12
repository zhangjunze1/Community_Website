<template>
  <div id="app" class="myhome" >

    <div class="m-home">
      <div class="container">
        <!--        <p class="home-title" style="color: black;text-align: center">-->
        <!--          Data Retrieval-->
        <!--        </p>-->
        <el-form ref="form" :model="form" label-width="2.037rem" size="mini" >
          <el-row type="flex" justify="start">
            <el-form-item prop="MyinvitationCode" label="邀请码:">
              <el-input v-model="MyinvitationCode" ></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 1.5%"  >
              <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
              <el-button class="btn-my" icon="el-icon-search" @click="getQuery">查询</el-button>
              <!--              <el-button icon="el-icon-download" @click="downloadCsv">下载文件</el-button>-->
            </el-form-item>
          </el-row>
        </el-form>
        <!--          :scroll-width="5000"-->
        <ve-table
          :columns="columns"
          :row-style-option="rowStyleOption"
          :cell-selection-option="cellSelectionOption"
          rowKeyFieldName="userId"
          :border-around="true"
          :border-x="false"
          :border-y="true"
          :table-data="tableData"
          row-key-field-name="userId"
          :checkbox-option="checkboxOption"
          style="margin-left: -7%;margin-right: -7%"
        />
        <div class="table-pagination"  >
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
import { findUserList } from '@/api/system'
export default {
  name: 'dataQuery',
  // 注册组件
  components: {
    Footer
  },
  data () {
    return {
      MyinvitationCode: '',
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
        { field: 'userId', key: 'a', title: '#', align: 'center' },
        { field: 'userName', key: 'b', title: '用户名', align: 'center' },
        { field: 'password', key: 'c', title: '密码', align: 'center' },
        { field: 'province', key: 'd', title: '省份', align: 'center' },
        { field: 'invitationCode', key: 'f', title: '邀请码', align: 'center' }
      ],
      tableData: []
    }
  },
  created () {
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
    async getQuery () {
      const { data } = await findUserList(this.pageIndex, this.pageSize, this.MyinvitationCode)
      this.totalCount = data.data.total
      this.tableData = data.data.sysUsers
      // for (tabledata in this.tableData) {
      //   if (tabledata.disease === '无权限') {
      //     this.tabledata.age = '无权限'
      //   }
      // }
    },
    resetForm () {
      this.MyinvitationCode = ''
      this.getQuery()
    }
  }
}
</script>

<style scoped>
.m-home {
  padding-top: 0% !important;
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
