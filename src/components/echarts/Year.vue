<template>
  <span class="item" style="text-align: center">
    <p style="font-size: 0.5rem">Host Data: total is</p>
    <div :id="'SamplesInYear'" style="width: 800px; height: 400px;margin-top: 10%;background-color: #FFFFFF"/>
  </span>
</template>

<script>
import * as echarts from 'echarts'
import { getGroupYearChartsData } from '../../api/echarts'
export default {
  name: 'Year',
  data () {
    return {
      total: '',
      yearList: [],
      dataList: []
    }
  },
  created () {
    this.getChartsData()
    // this.drawChart('SamplesInYear')
  },
  methods: {
    async getChartsData () {
      const { data } = await getGroupYearChartsData(window.sessionStorage.getItem('invitationCode'))
      this.dataList = data.data.count
      this.yearList = data.data.year
      this.total = data.data.total
      this.drawChart('SamplesInYear')
      console.log(data)
    },
    drawChart (chartid) {
      var myChart = echarts.init(document.getElementById(chartid))
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.yearList,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '样本数量',
            type: 'bar',
            barWidth: '60%',
            data: this.dataList
          }
        ]
      }
      option && myChart.setOption(option)
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
</style>
