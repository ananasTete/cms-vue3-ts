<template>
  <div class="">
    <my-echart :options="options"></my-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import * as echarts from 'echarts'
import MyEchart from '@/base-ui/myEchart'

export default defineComponent({
  components: { MyEchart },
  name: '',
  props: {
    xLabels: {
      type: Array as PropType<string[]>,
      require: true
    },
    listData: {
      type: Array as PropType<any[]>,
      require: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        //设置x轴
        xAxis: {
          data: props.xLabels,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          //设置渐变色
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: props.listData //设置数据
          }
        ]
      }
    })
    return {
      options
    }
  }
})
</script>

<style scoped lang="less"></style>
