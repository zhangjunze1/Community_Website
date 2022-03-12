<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     style="padding-left: 0.1852rem;padding-bottom: 0.1852rem;font-size: 0.222rem">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>邀请码</el-breadcrumb-item>
        <el-breadcrumb-item>邀请码生成</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
<!--    <div class="box">-->
<!--      <div class="column">-->
<!--          <span class="item">-->
<!--            <div :id="'reg'" style="width: 14.815rem; height: 7.407rem; background-color: #FFFFFF"/>-->
<!--          </span>-->
<!--        <span class="item">-->
<!--            <div :id="'end'" style="width: 14.815rem; height: 7.407rem; background-color: #FFFFFF"/>-->
<!--          </span>-->
<!--      </div>-->
<!--    </div>-->
    <el-transfer
      filterable
      :filter-method="filterMethod"
      :titles="['可选省份', '已选择省份']"
      filter-placeholder="请输入省份拼音"
      v-model="provinces"
      :data="data">
    </el-transfer>
    <br>
    <row>
      <div style="display: inline" >
        <el-tooltip :content="'Switch value: ' + value" placement="top">
        <el-switch
          style="display: block"
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="数据权限开放"
          active-value="yes"
          inactive-text="遮盖部分数据权限"
          inactive-value="no"
        >
        </el-switch>
        </el-tooltip>
        <el-button style="margin-top: 10px;" type="primary" size="mini" @click="getInvitationCode()">生成邀请码</el-button>
        <p style="margin-top: 10px">生成的邀请码是：{{this.code}}</p>
      </div>
    </row>
  </div>
</template>

<script>
import { applyForCode } from '@/api/code'
export default {
  name: 'InvitationCode',
  data () {
    // BEIJING("北京",1),
    //   SHANGHAI("上海",2),
    //   TIANJIN("天津",3),
    //   CHONGQING("重庆",4),
    //   XIANGGANG("香港",5),

    //   AOMEN("澳门",6),
    //   ANHUI("安徽",7),
    //   FUJIAN("福建",8),
    //   GUANGDONG("广东",8),
    //   GUANGXI("广西",9),

    //   GUIZHOU("贵州",10),
    //   GANSU("甘肃",11),
    //   HAINAN("海南",12),
    //   HEBEI("河北",13),
    //   HENAN("河南",14),

    //   HEILONGJIANG("黑龙江",15),
    //   HUBEI("湖北",16),
    //   JILIN("吉林",17),
    //   JIANGSU("江苏",18),
    //   JIANGXI("江西",19),

    //   LIAONING("辽宁",20),
    //   NEIMENGGU("内蒙古",21),
    //   NINGXIA("宁夏",22),
    //   QINGHAI("青海",23),
    //   SHANXIQIN("陕西",24),

    //   SHANXIJIN("山西",25),
    //   SHANDONG("山东",26),
    //   SICHUANG("四川",27),
    //   TAIWAN("台湾",28),
    //   XIZANG("西藏",29),

    //   YUNNAN("云南",30),
    //   ZHEJIANG("浙江",31);
    const generateData = _ => {
      const data = []
      const provinces =
        ['北京', '上海', '天津', '重庆', '香港',
          '澳门', '安徽', '福建', '广东', '广西',
          '贵州', '甘肃', '海南', '河北', '河南',
          '黑龙江', '湖北', '湖南', '吉林', '江苏',
          '江西', '辽宁', '内蒙古', '宁夏', '青海',
          '陕西', '山西', '山东', '四川', '台湾',
          '西藏', '新疆', '云南', '浙江']
      const pinyin =
        ['beijing', 'shanghai', 'tianjing', 'chongqing', 'xianggang',
          'aomen', 'anhui', 'fujian', 'guangdong', 'guangxi',
          'guizhou', 'gansu', 'hainan', 'hebei', 'henan',
          'heilongjiang', 'hubei', 'hunan', 'jilin', 'jiangsu',
          'jiangxi', 'liaoning', 'neimenggu', 'ningxia', 'qinghai',
          'shanxi', 'shanxi', 'shandong', 'sichuan', 'taiwan',
          'xizang', 'xinjiang', 'yunnan', 'zhejiang']
      provinces.forEach((province, index) => {
        data.push({
          label: province,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      value: 'yes',
      data: generateData(),
      temp: '',
      code: '',
      provinces: [],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  },
  created () {
    this.$notify({
      title: '提示',
      message: '他人注册时需要使用邀请码,本页面其使用本邀请码注册的用户，可观看对应的省份。   注：邀请码不可重复使用',
      type: 'warning',
      duration: 5000
    })
  },
  methods: {
    getdata () {
      console.log(this.data)
      console.log(this.provinces.length)
      this.provinces.forEach((item, index) => {
        this.temp = this.temp + ',' + item
      })
      console.log(this.temp)
      console.log(this.value)
    },
    async getInvitationCode () {
      const confirmResult = await this.$confirm('是否根据当前省份权限生成邀请码，同时将数据权限调为<' + this.value + '>?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果商家点击确定返回字符串 confirm
      // 如果商家点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消本次申请')
      }
      this.provinces.forEach((item, index) => {
        this.temp = this.temp + ',' + item
      })
      const { data } = await applyForCode(this.temp, this.value)
      if (data.code === 200) {
        this.code = data.data.inviteCode
        this.$notify({
          title: '成功',
          message: '本次生成的邀请码为： <' + data.data.inviteCode + '>',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '警告',
          message: '本次生成的邀请码失败',
          type: 'warning',
          duration: 2000
        })
      }
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
