<template>
  <span class="item" style="text-align: center">
    <p style="font-size: 0.5rem">Serotype Data: total is {{this.total}}</p>
    <div :id="'Serotype'" style="width: 800px; height: 400px;margin-top: 10%;background-color: #FFFFFF"/>
  </span>
</template>

<script>
import * as echarts from 'echarts'
import { getSerotypeChartsData } from '@/api/echarts'
export default {
  name: 'Serotype',
  data () {
    return {
      total: '',
      dataList: []
    }
  },
  created () {
    this.getChartsData()
  },
  methods: {
    async getChartsData () {
      const { data } = await getSerotypeChartsData(window.sessionStorage.getItem('invitationCode'))
      this.dataList = data.data.groupSerotype
      this.total = data.data.total
      this.drawChart('Serotype')
      console.log(data)
    },
    drawChart (chartid) {
      var myChart = echarts.init(document.getElementById(chartid))
      var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '病菌来源',
            type: 'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
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
