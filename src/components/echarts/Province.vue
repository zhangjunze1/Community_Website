<template>
  <div class="hello">
    <div ref="mapBox" style="height:600px;width:800px"></div>
  </div>
</template>

<script>
// 1.导入 echarts
import * as echarts from 'echarts'
import 'echarts/map/js/china.js'
import { getProvinceChartsData } from '@/api/echarts'
// 使用地图 需要先注册地图
const option = {
  title: {
    text: '地图'
  },
  // 控制数据和显示问题
  series: [{
    name: '样本数量',
    type: 'map', // 告诉echarts 渲染地图
    map: 'china',
    label: { // label默认是不显示的，省份字体
      show: true, // 显示各个省份名称
      fontSize: 10
    },
    itemStyle: {
      areaColor: '#fff' // 区域的背景颜色
    },
    emphasis: { // 控制鼠标滑过时的高亮样式
      itemStyle: {
        areaColor: '#c7fffd'
      }
    },
    zoom: 1.2, // 控制地图的放大缩小
    data: JSON.parse(window.sessionStorage.getItem('province'))
  }],
  // 显示颜色
  visualMap: [{
    type: 'piecewise',
    show: true,
    splitNumber: 6,
    pieces: [{
      min: 140
    }, {
      min: 81,
      max: 140
    }, {
      min: 51,
      max: 80
    }, {
      min: 21,
      max: 50
    }, {
      min: 1,
      max: 20
    }, {
      min: 0,
      max: 0
    }],
    // align:'right' // 默认是left
    inRange: {
      symbol: 'rect',
      color: ['#fff', '#ffaa85', '#ff7b69', '#cc2929', '#8c0d0d', '#660208']
    },
    itemHeight: 10,
    itemWidth: 20
  }],
  tooltip: {
    trigger: 'item'
    // position: function (pos, params, dom, rect, size) {
    //       // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
    //       var obj = {top: 60};
    //       obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
    //       return obj;
    //   }
  }
}
// myChart.setOption(option)
// this.myChart.setOption(option);
export default {
  name: 'helloword',
  mounted () {
    this.getChartsData()
    // this.mycharts = echarts.init(this.$refs.mapBox)
    this.myChart = echarts.init(this.$refs.mapBox)
    // var myChart = echarts.init(document.getElementById('map'));
    this.myChart.setOption(option)
  },
  data () {
    return {
      dataList: []
    }
  },
  created () {
  },
  methods: {
    async getChartsData () {
      const { data } = await getProvinceChartsData(window.sessionStorage.getItem('invitationCode'))
      var checkedIdStr = JSON.stringify(data.data.GroupProvince)
      window.sessionStorage.setItem('province', checkedIdStr)
      console.log(data)
      var arrAfter = JSON.parse(window.sessionStorage.getItem('province'))
      console.log(arrAfter, typeof arrAfter)
    }
  }
}
</script>

<style scoped>
</style>
